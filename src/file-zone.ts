import {
  $,
  $input,
  type Autocomplete,
  type DomElement,
  type InputFile,
  type KnownFileTypeSpecifier,
} from "@neptune3d/dom";

/**
 * An unstyled component for creating a droppable and clickable zone
 * for selecting a file or multiple files.
 */
export class FileZone {
  constructor(props: FileZoneProps) {
    this.onChange = props.onChange;
    this.accept = props.accept;
    this.multiple = props.multiple ?? false;
    this.rootOpensFileDialog = props.rootOpensFileDialog ?? true;
    this.onDragEnter = props.onDragEnter;
    this.onDragOver = props.onDragOver;
    this.onDragLeave = props.onDragLeave;

    this.root = $("div")
      .className("n-file-zone")
      .on("dragenter", (e) => {
        this._dragCounter++;
        if (this._dragCounter === 1) {
          this.onDragEnter?.(!!e.dataTransfer?.types.includes("Files"));
        }
      })
      .on("dragleave", (e) => {
        this._dragCounter--;
        if (this._dragCounter === 0) {
          this.onDragLeave?.(!!e.dataTransfer?.types.includes("Files"));
        }
      })
      .on("dragover", (e) => {
        // needed for drop to work.
        e.preventDefault();
        this.onDragOver?.(!!e.dataTransfer?.types.includes("Files"));
      })
      .on("drop", (e) => {
        e.preventDefault();
        this._dragCounter = 0;
        if (e.dataTransfer?.files) {
          this._handleFileChange(Array.from(e.dataTransfer.files));
        }
      });

    if (this.rootOpensFileDialog) {
      this.root.on("click", () => {
        this.openFileDialog();
      });
    }

    this.content = $("div").className("n-file-zone-content");

    this.input = $input("file")
      .className("n-file-zone-input")
      .display("none")
      .on("change", () => {
        this._handleFileChange(Array.from(this.input.getFiles()));
      });

    if (this.accept) {
      this.input.accept(...this.accept);
    }

    this.root.add(this.content, this.input);
  }

  /**
   * Called when the user picks file(s) from the file dialog
   * or when dropping file(s) in the dropzone.
   *
   * If `multiple` is false and the user drops multiple files,
   * onChange will be called with only the first file.
   */
  onChange: FileZoneOnChange;

  /**
   * Array of file type specifiers to be passed to the `accept` attribute of the file input.
   */
  accept?: string[];

  /**
   * Whether to allow selecting multiple files.
   */
  multiple: boolean;

  /**
   * Whether clicking on the root should
   * activate the native file dialog.
   */
  rootOpensFileDialog: boolean;

  /**
   * Called when the drag enters the file zone.
   */
  onDragEnter?: FileZoneOnDragEnter;

  /**
   * Called when the user drags files over the file zone.
   */
  onDragOver?: FileZoneOnDragOver;

  /**
   * Called when the drag leaves the file zone.
   */
  onDragLeave?: FileZoneOnDragLeave;

  /**
   * Root element
   *
   * Classname: `n-file-zone`.
   */
  readonly root: DomElement<"div">;
  /**
   * Content element. Can contain arbitrary content
   * such as a title or a button to trigger the file input.
   *
   * Classname: `n-file-zone-content`.
   */
  readonly content: DomElement<"div">;
  /**
   * The `<input type="file"` element used for
   * native file selection.
   *
   * Classname: `n-file-zone-input`.
   */
  readonly input: InputFile;

  protected _dragCounter = 0;

  /**
   * Triggers opening of file dialog on the file input
   * via `click` event.
   */
  openFileDialog(): void {
    this.input.click();
  }

  /**
   * Clears the file input selected `files`.
   */
  clearFiles(): void {
    this.input.clear();
  }

  protected _handleFileChange(files: File[]): void {
    const slicedFiles = this.multiple ? files : files.slice(0, 1);

    this.onChange(slicedFiles);
  }
}

export type FileZoneProps = {
  /**
   * Called when the user picks file(s) from the file dialog
   * or when dropping file(s) in the dropzone, but only if
   * all files passed are allowed determined by the `accept` prop.
   *
   * If `multiple` is false and the user drops multiple files,
   * onChange will be called with only the first file.
   */
  onChange: FileZoneOnChange;
  /**
   * Array of file type specifiers to be passed to the `accept` attribute of the file input.
   *
   * Used as a hint, not strict validation, since
   * it's based on the extension, not actual file content.
   */
  accept?: Autocomplete<KnownFileTypeSpecifier>[];
  /**
   * Whether to allow selecting multiple files.
   *
   * By default only a single file is allowed at a time.
   */
  multiple?: boolean;
  /**
   * Whether clicking on the root should
   * activate the native file dialog or you plan on
   * rendering your own button for that.
   *
   * True by default.
   */
  rootOpensFileDialog?: boolean;
  /**
   * Called when the drag enters the file zone.
   */
  onDragEnter?: FileZoneOnDragEnter;
  /**
   * Called when the user drags files over the file zone.
   */
  onDragOver?: FileZoneOnDragOver;
  /**
   * Called when the drag leaves the file zone.
   */
  onDragLeave?: FileZoneOnDragLeave;
};

export type FileZoneOnChange = (allowedFiles: File[]) => void;

export type FileZoneOnDragEnter = (isFiles: boolean) => void;

export type FileZoneOnDragLeave = (isFiles: boolean) => void;

export type FileZoneOnDragOver = (isFiles: boolean) => void;
