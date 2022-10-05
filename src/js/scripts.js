const searchInput = document.getElementById("searchInput");
const dataCard = document.getElementById("data-card");
const sponse_img = document.getElementById("sponse_img");
const search_btn = document.getElementById("search_btn");
const articleSearched = document.getElementById("articleSearched");
const cardBtnNext = document.getElementById("cardBtnNext");
const cardBtnPrev = document.getElementById("cardBtnPrev");

let cards = [];
let sponserImages = [];

// --------------fetching data--------------------------

fetch("js/myData.json")
  .then((res) => res.json())
  .then((data) => {
    // input value search
    // console.log(data)
    searchInput.addEventListener("keypress", (e) => {
      const value = e.target.value.toLowerCase();
      //check if enter button pressed
      if (e.key == "Enter") {
        e.preventDefault();
        search_btn.click();
        const searchFunc = data.forEach((element) => {
          if (element.title.toLowerCase().includes(value)) {
            // console.log(element.title);
            // console.log(typeof(element.title))
            articleSearched.innerHTML += `
                    <ul>
                      <ol>
                         <a href="">${element.title}</a>         
                      </ol>
                    </ul>                    
            `;
          } else {
            articleSearched.innerHTML += `<p> NO RESULT FOUND </p> `;
          }
        });

        setTimeout(searchFunc, 3000);
      }
    });

    // implement cards in HTML

    let articleNumber = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];

    // let articleNumber = [];

    // for (let k=1; k<=16;k++) {
    //   articleNumber.push(k);
    // }

    //------------------------------------------------------
    // Navigate the articles

    let index;

    cardBtnNext.addEventListener("click", () => {
      index += 1;
      if (index == 4) {
        index = 0;
      }
      console.log(articleNumber[index]);
    });

    cardBtnPrev.addEventListener("click", () => {
      index -= 1;
      console.log(index);
      if (index == -1) {
        index = 3;
      }
      console.log(articleNumber[index]);
    });

    // console.log(index);

    //------------------------------------------------------

    for (let i = articleNumber[0][0]; i <= articleNumber[0][3]; i++) {
      cards += `
      <div class="card cardsBox my-3 border-0 d-flex flex-lg-row flex-md-column"   >
      <img src='${data[i].img}' class="post-img"  alt="image-post-${data[i].id}" />
      <div class="card-body">              
      <h5 class="card-title">${data[i].title}</h5>
      <p class="card-text"> <small class="text-muted"> ${data[i].published}</small>  </p>
      <p class="card-text">  ${data[i].text} </p>

      <!-- Articles Modal -->
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-outline-dark rounded-0" data-bs-toggle="modal" data-bs-target="#articleModal${data[i].id}">
        Read more
        </button>
        <!-- Modal -->
        <div class="modal fade" id="articleModal${data[i].id}" tabindex="-1" >
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header ">       
                <button type="button" class="btn-close mx-2 position-absolute  end-0" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <img src='${data[i].img}' class="card-img-top article-img"  alt="image-post-${data[i].id}"  />
              <div class="modal-body">
              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text"> <small class="text-muted"> ${data[i].published}</small>  </p>
            <p >  ${data[i].article}  </p>              
           </div>
            </div>
          </div>
        </div>      
      </div>
      </div>
      `;
    }

    // implement sponsors image
    for (let index = 0; index < 20; index++) {
      sponserImages += `
        <img height="80px" src="${data[16].sponser.img[index]}" alt="" />
        `;
    }

    dataCard.innerHTML = cards;
    sponse_img.innerHTML = sponserImages;
  })
  .catch((err) => {
    console.log(err);
  });
