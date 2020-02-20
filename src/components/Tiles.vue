<template>
  <div id="container">
    <ul id="tiles-container" class="table">
      <li v-for="(item, index) in list" :class="getClass(index)">
        <div>
          <img :src="item.img">
        </div>
        <div class="info">
          <h2>{{ item.name }}</h2>
          <div v-html="item.desc"></div>
          <br>
          <div class="button-group">
            <button>More Info</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  define(["Vue"], function(Vue)
  {
    
    return function(el, list)
    {
      Vue.component("tiles",
      {
        template: template,
        props:
        {
          list: {
            type:Array,
            required: true
          }
        },
        mounted: function()
        {
          //listen to resize event, make sure tile size follow the window size
          if(window.addEventListener)
          {
              window.addEventListener("resize", this.adjustHeight);    
          } else 
          {
              window.attachEvent("onresize", this.adjustHeight);    
          }
          //also important to listen image onload as will resize the tile
          var self = this;
          var images = document.querySelectorAll("#tiles-container li img");
          [].slice.call(images).forEach(function(img)
          {
              img.onload = function(e)
              {
                self.adjustHeight();
              }
          });
          //initial set
          this.adjustHeight();
        },
        methods:
        {
          getClass: function(index)
          {
            var len = this.list.length;
            if(len%2 == 0 && index == len-2)
            {
              return "last-2nd";
            } else if (len%2 == 1 && index == len-1)
            {
              return "last-center";
            }
            return "";
          },
          adjustHeight: function()
          {
            var tiles = document.querySelectorAll("#tiles-container > li"),
            buttonStyle, maxH = 0;
            
            //reset to allow autosize
            [].slice.call(tiles).forEach(function(tile)
            {
              tile.style.height = "";
              buttonStyle = tile.querySelector(".button-group").style;
              buttonStyle.position = "relative";
            });
            //get max Height
            [].slice.call(tiles).forEach(function(tile)
            {
              maxH = Math.max(maxH, tile.offsetHeight);
            });
            //implement max Height to all tiles
            [].slice.call(tiles).forEach(function(tile)
            {
              tile.style.height = maxH + "px";
              buttonStyle = tile.querySelector(".button-group").style;
              buttonStyle.position = "absolute";
              buttonStyle.bottom = "12px";
              buttonStyle.left = 0;
              buttonStyle.right = 0;
            });
          }
        }
      });
      
      //render component
      el.innerHTML = "<tiles :list='listArr'></tiles>";
      
      var app = new Vue(
      {
        el: el,
        data: 
        {
          listArr: list
        }
      });
    }
  
  });
</script>