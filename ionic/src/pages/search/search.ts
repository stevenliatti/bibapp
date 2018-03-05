import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Page } from '../page-interface';
import { Book } from '../book';
import { BookProvider } from '../../providers/book/book';
import { ImagesProvider } from '../../providers/images/images';
import { Http } from '@angular/http';
import { BookPage } from '../book/book';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  page: Page;
  loading: any;
  items: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public bookProvider: BookProvider,
    public imagesProvider: ImagesProvider,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    this.page = this.navParams.get('page');
    this.search(this.navParams.get('val'));
  }

  search(val: string) {
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.showLoader();
      this.bookProvider.search(val).then(data => {
        this.items = data;
        this.loading.dismiss();
      }).catch(_ => {
        this.loading.dismiss();
      })
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loading.present();
  }

  openBook(id) {
    if (id) {
      this.navCtrl.push(BookPage, {
        id: id,
        book: this.items.find(b => { return b.id === id })
      });
    }
  }

}
