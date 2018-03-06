import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';

import { BookProvider } from '../../providers/book/book';
import { ManageCommentPage } from '../manage-comment/manage-comment';
import { ManageFavouritePage } from '../manage-favourite/manage-favourite';
import { ManageReviewPage } from '../manage-review/manage-review';
import { AuthProvider } from '../../providers/auth/auth';
import { ImagesProvider } from '../../providers/images/images';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  id: string;
  book: any;
  userConnected: boolean;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private bookProvider: BookProvider,
    public authProvider: AuthProvider,
    private imagesProvider: ImagesProvider
  ) {
    this.id = this.navParams.get('id');
    this.book = this.navParams.get('book');
    this.userConnected = this.authProvider.isConnected();
    
    this.bookProvider.getBook(this.id).then(data => {
      this.book = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  addComment() {
    let addModal = this.modalCtrl.create(ManageCommentPage, { id: this.id, comment: this.book.comment });
    addModal.onDidDismiss((data) => {
      if (data) {
        this.book.comment = data.content;
        this.bookProvider.saveComment(data);
      }
    });
    addModal.present();
  }

  addFavourite() {
    let addModal = this.modalCtrl.create(ManageFavouritePage, { id: this.id });
    addModal.onDidDismiss((data) => {
      if (data) {
        this.book.favourite = data.content;
        this.bookProvider.saveFavourite(data);
      }
    });
    addModal.present();
  }

  addReview() {
    let addModal = this.modalCtrl.create(ManageReviewPage, { id: this.id });
    addModal.onDidDismiss((data) => {
      if (data) {
        this.book.review = data.content;
        this.bookProvider.saveReview(data);
      }
    });
    addModal.present();
  }

  deleteComment() {
    this.book.comment = undefined;
    this.bookProvider.deleteComment(this.id);
  }

  deleteFavourite() {
    this.book.favourite = undefined;
    this.bookProvider.deleteFavourite(this.id);
  }

  deleteReview() {
    this.book.review = undefined;
    this.bookProvider.deleteReview(this.id);
  }

  deleteImage() {
    this.imagesProvider.deleteImage(this.id);
  }

}
