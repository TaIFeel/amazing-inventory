import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // без этого параметра не работают css свойства на элэменты созданные здесь в коде
})
export class AppComponent implements OnInit{

  oppened_page=1;
  max_page=0;

  next_page(){
    var page_cur = document.querySelector(`[page_num="${this.oppened_page}"]`);
    page_cur?.setAttribute("style", "display:None;");

    var page_new = document.querySelector(`[page_num="${this.oppened_page+1}"]`);
    page_new?.removeAttribute("style");

    if(this.oppened_page === 1){
      document.getElementById("prev_page")?.removeAttribute("disabled");
    }

    this.oppened_page++


    if(this.oppened_page===this.max_page){
      document.getElementById("next_page")?.setAttribute('disabled', 'disabled');
    }

  }

  prev_page(){
    var page_cur = document.querySelector(`[page_num="${this.oppened_page}"]`);
    page_cur?.setAttribute("style", "display:None;");

    var page_new = document.querySelector(`[page_num="${this.oppened_page-1}"]`);
    page_new?.removeAttribute("style");

    if(this.oppened_page===this.max_page){
      document.getElementById("next_page")?.removeAttribute("disabled");
    }

    this.oppened_page--;

    if(this.oppened_page===1){
      document.getElementById("prev_page")?.setAttribute('disabled', 'disabled');
    }

  }

  ngOnInit(){

    document.getElementById("prev_page")?.setAttribute('disabled', 'disabled');

    var inv = document.querySelector(".inventory");

    var active_slot = 42;
    var unactive_slot = 48;
    var all_slots = active_slot + unactive_slot;
    var max_page = Math.ceil(all_slots/30)

    this.max_page = max_page


    var page = document.createElement("div"); // Первая страница инвентаря
    page.classList.add("page");
    page.setAttribute("page_num", "1")

    inv?.appendChild(page);

    var cur_page = page;

    var loaded_item = 0;


    function fill_inv(slots:number, item_fill:string, end_slot:number){
      for(loaded_item;loaded_item!=end_slot;loaded_item++){

        var item = document.createElement("div");

        item.setAttribute("slot", `${loaded_item}`);
        item.classList.add('item', `item-${item_fill}`);
        item.innerHTML = '<div class="content_item"></div>'
        cur_page.appendChild(item);

        if((loaded_item+1)%30 === 0){
          var page_num = Number(cur_page.getAttribute("page_num"))+1;

          if(page_num <= max_page){

            cur_page = document.createElement("div");

            cur_page.classList.add("page");
            cur_page.setAttribute("page_num", String(page_num));
            cur_page.style.display=("None");

            inv?.appendChild(cur_page);
          }
        }    
      }

    }

    var data_inv=`{
      "0":{
        "name": "Ремонтный комплект",
        "img": "repair-kit.png",
        "x": "1",
        "slot": "37"
      },
      "1":{
        "name": "Ремонтный комплект",
        "img": "repair-kit.png",
        "x": "3",
        "slot": "12"
      },
      "2":{
        "name": "Ремонтный комплект",
        "img": "repair-kit.png",
        "x": "3",
        "slot": "29"
      }
    }`

    fill_inv(active_slot, "active", active_slot+loaded_item);
    fill_inv(unactive_slot, "unactive", unactive_slot+loaded_item);

    var json_data_inv = JSON.parse(data_inv);

    var data_inv_length = Object.keys(json_data_inv).length;

    for(let i = 0; i<data_inv_length; i++){
      var slot = document.querySelectorAll(`[slot="${json_data_inv[i]["slot"]}"] .content_item`);
      slot[0].innerHTML = `
      <div class="name_item">${json_data_inv[i]["name"]}</div>
      <img src='assets/images/${json_data_inv[i]['img']}' class="image_item"/>
      <p class="count_items">${json_data_inv[i]["x"]} шт.</p>`
    }


  }

}