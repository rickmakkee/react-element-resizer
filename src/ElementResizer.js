import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export const ScaleMode = {
    CONTAIN: 'contain',
    COVER: 'cover',
    ALIGN_ONLY: 'align-only'
};

/**
 * An implementation of `background-size: cover/contain` for all elements.
 *
 * To use this component wrap this component around the element you want to
 * position.
 *
 * Example:
 * ```html
 * <ElementResizer scaleMode={ScaleMode.COVER}
 *   elementWidth={1920}
 *   elementHeight={1080}
 * >
 *   <video src={video} autoPlay loop/>
 * </ElementResizer>
 * ```
 */
class ElementResizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            containerWidth: 0,
            containerHeight: 0,
            x: 0,
            y: 0
        };
    }

    componentDidMount() {
        this.resize(this.props);

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(nextProps) {
        const {containerWidth, containerHeight} = this.state;
        const propContainerWidth = nextProps.containerWidth;
        const propContainerHeight = nextProps.containerHeight;

        if ((propContainerWidth &&
                propContainerWidth !== containerWidth) ||
            (propContainerHeight &&
                propContainerHeight !== containerHeight)) {
            this.resize(nextProps);
        }
    }

    handleResize = debounce(() => {
        this.resize(this.props);
    }, 100);

    resize({
        alignmentX,
        alignmentY,
        containerHeight,
        containerWidth,
        elementHeight,
        elementWidth,
        maxWidth,
        maxHeight,
        scaleMode
    }) {
        let targetWidth,
            targetHeight,
            boundRatioX,
            boundRatioY,
            scale = 1;

        const boundHeight = containerHeight || this.domElm.offsetHeight;
        const boundWidth = containerWidth || this.domElm.offsetWidth;

        // get needed scale to fit in bounds with cover
        if (scaleMode === ScaleMode.CONTAIN || scaleMode === ScaleMode.COVER) {
            boundRatioX = boundWidth / elementWidth;
            boundRatioY = boundHeight / elementHeight;
            scale = 1;
        }

        // get scale for bounds container
        switch (scaleMode) {
            case ScaleMode.CONTAIN:
                scale = boundRatioX < boundRatioY ? boundRatioX : boundRatioY;
                break;
            case ScaleMode.COVER:
                scale = boundRatioX > boundRatioY ? boundRatioX : boundRatioY;
                break;
            case ScaleMode.ALIGN_ONLY:
                targetWidth = elementWidth;
                targetHeight = elementHeight;
                break;
        }

        if (scaleMode === ScaleMode.CONTAIN || scaleMode === ScaleMode.COVER) {
            // get needed scale to fit in max with contain
            if (maxWidth || maxHeight) {
                let scaleMaxRatioX = scale;
                let scaleMaxRatioY = scale;

                if (maxWidth) {
                    scaleMaxRatioX = maxWidth / elementWidth;
                }

                if (maxHeight) {
                    scaleMaxRatioY = maxHeight / elementHeight;
                }

                let scaleMax = scaleMaxRatioX < scaleMaxRatioY ?
                    scaleMaxRatioX : scaleMaxRatioY;

                scale = Math.min(scale, scaleMax);
            }

            // do the actual scale
            targetWidth = elementWidth * scale;
            targetHeight = elementHeight * scale;
        }

        this.setState({
            width: `${Math.round(targetWidth)}px`,
            height: `${Math.round(targetHeight)}px`,
            boundWidth,
            boundHeight,
            x: `${Math.round((boundWidth - targetWidth) * alignmentX)}px`,
            y: `${Math.round((boundHeight - targetHeight) * alignmentY)}px`
        });
    }

    renderChildren() {
        const {children} = this.props;
        const {height, width, x, y} = this.state;
        const style = {
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height
        };

        return React.Children.map(children, child =>
            React.cloneElement(child, {
                style: style
            })
        );
    }

    render() {
        const {overflowVisible} = this.props;
        const style = {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: overflowVisible ? 'visible' : 'hidden'
        };

        return (
            <div style={style}
                 ref={elm => {
                     this.domElm = elm;
                 }}
            >
                {this.renderChildren()}
            </div>
        );
    }
}

ElementResizer.propTypes = {
    alignmentX: PropTypes.number,
    alignmentY: PropTypes.number,
    children: PropTypes.node,
    containerHeight: PropTypes.number,
    containerWidth: PropTypes.number,
    elementHeight: PropTypes.number.isRequired,
    elementWidth: PropTypes.number.isRequired,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    overflowVisible: PropTypes.bool,
    scaleMode: PropTypes.oneOf([
        ScaleMode.CONTAIN,
        ScaleMode.COVER,
        ScaleMode.ALIGN_ONLY
    ]).isRequired
};

ElementResizer.defaultProps = {
    alignmentX: 0.5,
    alignmentY: 0.5,
    overflowVisible: false,
    scaleMode: ScaleMode.COVER
};

export default ElementResizer;
