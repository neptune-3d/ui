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

    this.root = $("div")
      .className("n-file-zone")
      .on("dragover", (e) => {
        e.preventDefault();
      })
      .on("drop", (e) => {
        e.preventDefault();
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

    this.root.add(this.content, this.input);
  }

  /**
   * Called when "change" event is triggered on the file input.
   */
  readonly onChange: (files: File[]) => void;

  /**
   * Array of file type specifiers that should be allowed.
   */
  readonly accept?: string[];

  /**
   * Whether to allow selecting multiple files.
   */
  readonly multiple: boolean;

  /**
   * Whether clicking on the root should
   * activate the native file dialog.
   */
  readonly rootOpensFileDialog: boolean;

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

  /**
   * Triggers opening of file dialog on the file input
   * via `click` event.
   */
  openFileDialog(): void {
    this.input.click();
  }

  protected _handleFileChange(files: File[]): void {
    const slicedFiles = this.multiple ? files : files.slice(0, 1);
    const allowedFiles = this._getAllowedFiles(slicedFiles);

    if (allowedFiles.length !== slicedFiles.length) {
      this.input.clearValue();
    }
    //
    else {
      this.onChange(allowedFiles);
    }
  }

  protected _getAllowedFiles(files: File[]): File[] {
    return files.filter((file) => {
      return this._isFileAccepted(file);
    });
  }

  protected _isFileAccepted(file: File): boolean {
    if (!this.accept) return true;

    const ext = "." + file.name.split(".").pop()?.toLowerCase();

    return this.accept.includes(file.type) || this.accept.includes(ext);
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
  onChange: (files: File[]) => void;
  /**
   * Optional array of file type specifiers that should be allowed.
   *
   * This is the same format as the `accept` attribute of the
   * `<input type="file"`.
   *
   * By default all file types are accepted.
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
};
