package com.racinglearnfun.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Color;
import android.graphics.Insets;
import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Collections;

/** Local-only shell: no permissions, native libraries, SDKs, or JavaScript bridge. */
public final class MainActivity extends Activity {
    private static final String URL = "https://appassets.androidplatform.net/assets/index.html";
    private WebView web;
    private OnBackInvokedCallback back;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(255,248,233));
        if (Build.VERSION.SDK_INT >= 30) {
            getWindow().setDecorFitsSystemWindows(false);
            root.setOnApplyWindowInsetsListener((v, insets) -> {
                Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                v.setPadding(bars.left,bars.top,bars.right,bars.bottom);
                return insets;
            });
        } else root.setFitsSystemWindows(true);
        web = new WebView(this);
        web.setBackgroundColor(Color.rgb(255,248,233));
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setBlockNetworkLoads(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setSupportMultipleWindows(false);
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest req) {
                // Embedded MP3 data URLs are local media, not network requests.
                if (req.getUrl().toString().startsWith("data:audio/mpeg;base64,")) return null;
                if (URL.equals(req.getUrl().toString())) {
                    try { return new WebResourceResponse("text/html", "UTF-8", getAssets().open("index.html")); }
                    catch (IOException ignored) { return denied(); }
                }
                return denied();
            }
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                return !URL.equals(req.getUrl().toString());
            }
        });
        root.addView(web,new FrameLayout.LayoutParams(-1,-1));
        setContentView(root);
        if (Build.VERSION.SDK_INT >= 33) {
            back = this::backNavigation;
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(OnBackInvokedDispatcher.PRIORITY_DEFAULT,back);
        }
        web.loadUrl(URL);
    }
    private static WebResourceResponse denied() {
        return new WebResourceResponse("text/plain","UTF-8",403,"Forbidden",Collections.emptyMap(),new ByteArrayInputStream(new byte[0]));
    }
    private void backNavigation() {
        web.evaluateJavascript("window.gameBack ? window.gameBack() : false", handled -> {
            if (!"true".equals(handled) && !isFinishing()) {
                new AlertDialog.Builder(this).setTitle("Leave Racing: Learn & Fun?")
                    .setMessage("Your completed levels are saved on this device.")
                    .setPositiveButton("Exit",(d,w)->finish()).setNegativeButton("Keep playing",null).show();
            }
        });
    }
    // API 33+ uses the OnBackInvokedCallback registered above. This fallback serves API 24–32.
    @SuppressLint("GestureBackNavigation")
    @Override public void onBackPressed() { backNavigation(); }
    @Override protected void onPause() {
        if (web != null) { web.evaluateJavascript("window.pauseGame && window.pauseGame()",null); web.onPause(); }
        super.onPause();
    }
    @Override protected void onResume() { super.onResume(); if(web!=null)web.onResume(); }
    @Override protected void onDestroy() {
        if(Build.VERSION.SDK_INT>=33 && back!=null)getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(back);
        if(web!=null){web.destroy();web=null;}
        super.onDestroy();
    }
}
