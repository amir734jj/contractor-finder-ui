import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import route from '../utilities/route.utility';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  downloadUrl(key: string) {
    return key ? route('image', key) : undefined;
  }

  async upload(file: File, description: string = '') {
    if (file) {
      const formData = new FormData();
      formData.append('File', file, file.name);
      formData.set('description', description);
      const key = await this.http.post(route('image', 'upload'), formData, {
        responseType: 'text',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).toPromise();
      return key.replace(/"/g, '');
    } else {
      return Promise.resolve('');
    }
  }
}
