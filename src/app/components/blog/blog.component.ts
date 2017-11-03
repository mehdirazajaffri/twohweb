import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apiServices/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private Api:ApiService) {
    // this.setItemsToShow();
      this.getBlogs();
   }
  blogs = [];
  blogsToShow = [];
  showBrands = false;
  
  getBlogs(){
      this.Api.getBlogs()
      .subscribe(
        (data)=>{
          console.log(data);
          this.blogs = data;
          this.setItemsToShow();
          this.showBrands = true;
        },
        (err)=>{
          console.log(err);
        }
      )
  }
  setItemsToShow(){
    
    //breaks items array into 3 pieces
    let count1 = this.blogs.length%3;
    let count2 = 0;

    let temp = [];
    for(let item of this.blogs){
      temp.push(item);
      if(temp.length==3 || count1==count2){
        if((temp.length==count1 && count1==count2) || temp.length==3 )
          this.blogsToShow.push(temp);
        if(temp.length==3){
          count2++;
          temp = [];
        }
      }
     
    }
     if(this.blogsToShow.length==0)
        this.blogsToShow.push(temp);
        console.log("blogs to Show")
     console.log(this.blogsToShow);
    
  }
  closeMenu() {
    if (document.getElementById('cart-list').style.display != 'none')
      document.getElementById('cart-list').style.display = 'none';
    if (document.getElementById('user-details').style.display != 'none')
      document.getElementById('user-details').style.display = 'none';
      console.log('closeMenu')
  }
ngOnInit() {
  }
}
