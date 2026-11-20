package kh.science.app;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView != null) {
            webView.setBackgroundColor(Color.parseColor("#F8FAFC"));
            webView.clearCache(true);
            webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

            // Fix Android Emulator GPU Compositor ghosting & trailing textures:
            // Emulators (especially experimental API 37 previews) fail OpenGL dirty-rect invalidation.
            // On emulators, use software layer to eliminate ghosting; real devices use full GPU.
            boolean isEmulator = Build.FINGERPRINT.startsWith("generic")
                    || Build.FINGERPRINT.startsWith("unknown")
                    || Build.MODEL.contains("google_sdk")
                    || Build.MODEL.contains("Emulator")
                    || Build.MODEL.contains("Android SDK built for x86")
                    || Build.HARDWARE.contains("goldfish")
                    || Build.HARDWARE.contains("ranchu");

            if (isEmulator) {
                webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
            }
        }
    }
}
