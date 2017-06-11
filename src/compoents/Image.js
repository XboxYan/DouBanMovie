import React, { PureComponent } from 'react';
import { Image } from 'react-native';

export default class extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isError: false
        };
    }

    onLoadEnd = () => {
        this.setState({
            isLoaded: true
        });
    }

    onError = () => {
        this.setState({
            isError: true
        });
    }

    render() {
        if(__IOS__){
            return (
                <Image {...this.props} />
            )
        }
        return (
            <Image
                onLoadEnd={this.onLoadEnd}
                onError={this.onError}
                style={this.props.style}
                source={this.props.source}
                resizeMode={this.props.resizeMode}
            >
                {
                    this.state.isLoaded && !this.state.isError ? null :
                        <Image
                            style={[styles.defaultSourceStyles, this.props.defaultSourceStyle]}
                            source={this.props.defaultSource }
                        />
                }
            </Image>
        );
    }
}

const styles = {
    defaultSourceStyles: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
		resizeMode: 'cover'
    }
}
