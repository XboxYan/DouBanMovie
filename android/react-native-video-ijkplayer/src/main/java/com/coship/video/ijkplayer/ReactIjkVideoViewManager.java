package com.coship.video.ijkplayer;

import android.text.TextUtils;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

import javax.annotation.Nullable;

public class ReactIjkVideoViewManager extends ViewGroupManager<IjkVideoView> {

    private static final String REACT_CLASS = "RCTVideo";

    private static final String PROP_SRC = "src";
    private static final String PROP_SRC_URI = "uri";
    private static final String PROP_SRC_TYPE = "type";
    private static final String PROP_RESIZE_MODE = "resizeMode";
    private static final String PROP_REPEAT = "repeat";
    private static final String PROP_PAUSED = "paused";
    private static final String PROP_MUTED = "muted";
    private static final String PROP_VOLUME = "volume";
    private static final String PROP_PROGRESS_UPDATE_INTERVAL = "progressUpdateInterval";
    private static final String PROP_SEEK = "seek";
    private static final String PROP_RATE = "rate";
    private static final String PROP_PLAY_IN_BACKGROUND = "playInBackground";
    private static final String PROP_DISABLE_FOCUS = "disableFocus";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected IjkVideoView createViewInstance(ThemedReactContext themedReactContext) {
        return new IjkVideoView(themedReactContext);
    }

    @Override
    public void onDropViewInstance(IjkVideoView view) {
        view.cleanUpResources();
    }

    @Override
    public @Nullable Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
        for (String event : VideoEventEmitter.Events) {
            builder.put(event, MapBuilder.of("registrationName", event));
        }
        return builder.build();
    }

    @Override
    public @Nullable Map<String, Object> getExportedViewConstants() {
        return MapBuilder.<String, Object>of(
                "ScaleNone", Integer.toString(ResizeMode.RESIZE_MODE_FIT),
                "ScaleAspectFit", Integer.toString(ResizeMode.RESIZE_MODE_FIT),
                "ScaleToFill", Integer.toString(ResizeMode.RESIZE_MODE_FILL),
                "ScaleAspectFill", Integer.toString(ResizeMode.RESIZE_MODE_CENTER_CROP)
        );
    }

    @ReactProp(name = PROP_SRC)
    public void setSrc(final IjkVideoView videoView, @Nullable ReadableMap src) {
        String uriString = src.hasKey(PROP_SRC_URI) ? src.getString(PROP_SRC_URI) : null;

        if (TextUtils.isEmpty(uriString)) {
            return;
        }

        videoView.setVideoPath(uriString);
    }

    @ReactProp(name = PROP_RESIZE_MODE)
    public void setResizeMode(final IjkVideoView videoView, final String resizeModeOrdinalString) {
        // TODO
    }

    @ReactProp(name = PROP_REPEAT, defaultBoolean = false)
    public void setRepeat(final IjkVideoView videoView, final boolean repeat) {
        videoView.setRepeatModifier(repeat);
    }

    @ReactProp(name = PROP_PAUSED, defaultBoolean = false)
    public void setPaused(final IjkVideoView videoView, final boolean paused) {
        videoView.setPausedModifier(paused);
    }

    @ReactProp(name = PROP_MUTED, defaultBoolean = false)
    public void setMuted(final IjkVideoView videoView, final boolean muted) {
        setVolume(videoView, muted ? 0 : 1);
    }

    @ReactProp(name = PROP_VOLUME, defaultFloat = 1.0f)
    public void setVolume(final IjkVideoView videoView, final float volume) {
        videoView.setVolumeModifier(volume);
    }

    @ReactProp(name = PROP_PROGRESS_UPDATE_INTERVAL, defaultFloat = 250.0f)
    public void setProgressUpdateInterval(final IjkVideoView videoView, final float progressUpdateInterval) {
        videoView.setProgressUpdateInterval(progressUpdateInterval);
    }

    @ReactProp(name = PROP_SEEK)
    public void setSeek(final IjkVideoView videoView, final float seek) {
        videoView.seekTo(Math.round(seek * 1000f));
    }

    @ReactProp(name = PROP_RATE)
    public void setRate(final IjkVideoView videoView, final float rate) {
        videoView.setRateModifier(rate);
    }

    @ReactProp(name = PROP_PLAY_IN_BACKGROUND, defaultBoolean = false)
    public void setPlayInBackground(final IjkVideoView videoView, final boolean playInBackground) {
        videoView.setPlayInBackground(playInBackground);
    }

    @ReactProp(name = PROP_DISABLE_FOCUS, defaultBoolean = false)
    public void setDisableFocus(final IjkVideoView videoView, final boolean disableFocus) {
        // TODO
    }
}
