//// <reference types="offscreencanvas" />
declare class QrScanner {
    static readonly DEFAULT_CANVAS_SIZE = 400;
    static readonly NO_QR_CODE_FOUND = "No QR code found";
    private static _disableBarcodeDetector: boolean;
    private static _workerMessageId: number;
    /** @deprecated */
    static set WORKER_PATH(workerPath: string);
    static hasCamera(): Promise<boolean>;
    static listCameras(requestLabels?: boolean): Promise<Array<QrScanner.Camera>>;
    readonly $video: HTMLVideoElement;
    readonly $canvas: HTMLCanvasElement;
    readonly $overlay?: HTMLDivElement;
    private readonly $codeOutlineHighlight?: SVGSVGElement;
    private readonly _onDecode?: (result: QrScanner.ScanResult) => void;
    private readonly _legacyOnDecode?: (result: string) => void;
    private readonly _legacyCanvasSize: number;
    private _preferredCamera: QrScanner.FacingMode | QrScanner.DeviceId;
    private readonly _maxScansPerSecond;
    private _lastScanTimestamp: number;
    private _scanRegion: QrScanner.ScanRegion;
    private _codeOutlineHighlightRemovalTimeout?: number;
    private _qrEnginePromise: Promise<Worker | BarcodeDetector>;
    private _active: boolean;
    private _paused: boolean;
    private _flashOn: boolean;
    private _destroyed: boolean;
    constructor(video: HTMLVideoElement, onDecode: (result: QrScanner.ScanResult) => void, options: {
        onDecodeError?: (error: Error | string) => void;
        calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion;
        preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId;
        maxScansPerSecond?: number;
        highlightScanRegion?: boolean;
        highlightCodeOutline?: boolean;
        overlay?: HTMLDivElement;
        /** just a temporary flag until we switch entirely to the new api */
        returnDetailedScanResult?: boolean;
        domTarget?: HTMLDivElement | ShadowRoot | null;
    });
    // /** @deprecated */
    // constructor(video: HTMLVideoElement, onDecode: (result: string) => void, onDecodeError?: (error: Error | string) => void, calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion, preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId);
    // /** @deprecated */
    // constructor(video: HTMLVideoElement, onDecode: (result: string) => void, onDecodeError?: (error: Error | string) => void, canvasSize?: number, preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId);
    // /** @deprecated */
    // constructor(video: HTMLVideoElement, onDecode: (result: string) => void, canvasSize?: number);
    hasFlash(): Promise<boolean>;
    isFlashOn(): boolean;
    toggleFlash(): Promise<void>;
    turnFlashOn(): Promise<void>;
    turnFlashOff(): Promise<void>;
    destroy(): void;
    start(): Promise<void>;
    stop(): void;
    pause(stopStreamImmediately?: boolean): Promise<boolean>;
    setCamera(facingModeOrDeviceId: QrScanner.FacingMode | QrScanner.DeviceId): Promise<void>;
    static scanImage(imageOrFileOrBlobOrUrl: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap | SVGImageElement | File | Blob | URL | String, options: {
        scanRegion?: QrScanner.ScanRegion | null;
        qrEngine?: Worker | BarcodeDetector | Promise<Worker | BarcodeDetector> | null;
        canvas?: HTMLCanvasElement | null;
        disallowCanvasResizing?: boolean;
        alsoTryWithoutScanRegion?: boolean;
        /** just a temporary flag until we switch entirely to the new api */
        returnDetailedScanResult?: boolean;
    }): Promise<QrScanner.ScanResult>;
    /** @deprecated */
    static scanImage(imageOrFileOrBlobOrUrl: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap | SVGImageElement | File | Blob | URL | String, scanRegion?: QrScanner.ScanRegion | null, qrEngine?: Worker | BarcodeDetector | Promise<Worker | BarcodeDetector> | null, canvas?: HTMLCanvasElement | null, disallowCanvasResizing?: boolean, alsoTryWithoutScanRegion?: boolean): Promise<string>;
    setGrayscaleWeights(red: number, green: number, blue: number, useIntegerApproximation?: boolean): void;
    setInversionMode(inversionMode: QrScanner.InversionMode): void;
    static createQrEngine(): Promise<Worker | BarcodeDetector>;
    /** @deprecated */
    static createQrEngine(workerPath: string): Promise<Worker | BarcodeDetector>;
    private _onPlay: void;
    private _onLoadedMetaData: void;
    private _onVisibilityChange: void;
    private _calculateScanRegion: QrScanner.ScanRegion;
    private _updateOverlay: void;
    private static _convertPoints: QrScanner.Point[];
    private _scanFrame: void;
    private _onDecodeError: void;
    private _getCameraStream: Promise<{ stream: MediaStream, facingMode: QrScanner.FacingMode }>;
    private _restartVideoStream: Promise<void>;
    private static _stopVideoStream: void;
    private _setVideoMirror: void;
    private _getFacingMode: QrScanner.FacingMode | null;
    private static _drawToCanvas: [HTMLCanvasElement, CanvasRenderingContext2D];
    private static _loadImage: Promise<HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap
    | SVGImageElement >;
    private static _awaitImageLoad: Promise<void>;
    private static _postWorkerMessage: Promise<number>;
    private static _postWorkerMessageSync: number;
}
declare namespace QrScanner {
    interface ScanRegion {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        downScaledWidth?: number;
        downScaledHeight?: number;
    }
    type FacingMode = 'environment' | 'user';
    type DeviceId = string;
    interface Camera {
        id: DeviceId;
        label: string;
    }
    type InversionMode = 'original' | 'invert' | 'both';
    interface Point {
        x: number;
        y: number;
    }
    interface ScanResult {
        data: string;
        cornerPoints: QrScanner.Point[];
    }
}
declare class BarcodeDetector {
    constructor(options?: {
        formats: string[];
    });
    static getSupportedFormats(): Promise<string[]>;
    detect(image: ImageBitmapSource): Promise<Array<{
        rawValue: string;
        cornerPoints: QrScanner.Point[];
    }>>;
}
declare global {
    interface Navigator {
        readonly userAgentData?: {
            readonly platform: string;
            readonly brands: Array<{
                readonly brand: string;
                readonly version: string;
            }>;
            getHighEntropyValues(hints: string[]): Promise<{
                readonly architecture?: string;
                readonly platformVersion?: string;
            }>;
        };
    }
}
export default QrScanner;
