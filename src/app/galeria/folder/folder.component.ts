import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Folder } from '../folder';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.css',
})
export class FolderComponent {
  private _folder: Folder | undefined;

  @Input()
  public set folder(folder: Folder | undefined) {
    this._folder = folder;
    this.currentIndex = 0;
  }
  public get folder(): Folder | undefined {
    return this._folder;
  }
  @Output()
  public closePreview = new EventEmitter();

  public currentIndex = 0;

  public get first(): boolean {
    return this.currentIndex === 0;
  }
  public get last(): boolean {
    if (!this.folder) {
      return false;
    }
    return this.currentIndex === this.folder.fileIds.length - 1;
  }

  moveRight() {
    if (this.folder) {
      if (this.currentIndex < this.folder.fileIds.length - 1) {
        this.currentIndex++;
      }
    }
  }

  moveLeft() {
    if (this.folder) {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  }
}
