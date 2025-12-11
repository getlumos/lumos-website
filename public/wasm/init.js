// WASM initialization wrapper
// This script loads and initializes the LUMOS WASM module

(async function() {
  try {
    // Import the WASM module
    const wasm = await import('/wasm/lumos_core.js');

    // Initialize WASM (loads the .wasm file)
    await wasm.default('/wasm/lumos_core_bg.wasm');

    // Expose the module on window
    window.__LUMOS_WASM__ = {
      generateCode: wasm.generateCode,
      validateSchema: wasm.validateSchema,
      ready: true
    };

    // Dispatch ready event
    window.dispatchEvent(new CustomEvent('lumos-wasm-ready', { detail: window.__LUMOS_WASM__ }));

    console.log('[LUMOS] WASM module loaded successfully');
  } catch (error) {
    console.error('[LUMOS] Failed to load WASM:', error);
    window.__LUMOS_WASM__ = { ready: false, error: error.message };
    window.dispatchEvent(new CustomEvent('lumos-wasm-error', { detail: error }));
  }
})();
