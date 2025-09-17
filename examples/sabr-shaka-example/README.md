# SABR + Shaka Player Example

This project provides a minimal, self-contained example of how to use [Shaka Player](https://shaka-player-demo.appspot.com/) with the `SabrStreamingAdapter` from the [googlevideo](https://github.com/LuanRT/googlevideo) library to play YouTube videos.

## Note

For an implementation that includes a proper user interface, advanced features, and best practices, please see the main **[Kira](https://github.com/LuanRT/kira)** project this example is derived from.

Things **not included** in this minimal example but available in the main project:
*   A proper watch page and user interface.
*   Support for DRM-protected content.
*   A recommendation system and persistent user sessions.
*   Saving and resuming playback position.
*   Advanced error handling and UI feedback.
*   A video/audio downloader.

## How to Run

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to the local URL provided by Vite (e.g., `http://localhost:5173`).

## License
Distributed under the [MIT](../../LICENSE) License.