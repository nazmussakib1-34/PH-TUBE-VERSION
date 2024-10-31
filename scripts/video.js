console.log("video script added");

function getTimeString(time){
    // Get hour and rest second
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove("active");
    }
}

// 1 - Fetch, Load and show categories on html

// Create load cetagories and

const loadCategories = () => {
    // console.log("Load categories Created");
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Create video load
const loadVideos = () => {
    // console.log("Load categories Created");
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};


const loadCategoryVideos = (id) =>{
    //  alert(id);
    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}

const loadDetails = (videoId) =>{
    console.log(videoId);
}
// Display videos

//     const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML="";

    if(videos.length == 0){ 
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
                <img src="assets/Icon.png"/>
                <h2 class="text-center text-xl font-bold">
                NO CONTENT IN THIS SECTION
                </h2>
        </div>
        `;

        return;
    }else{
        videoContainer.classList.add("grid");
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        card.classlist ="card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
             <img
             src=${video.thumbnail}
             class="h-full w-full object-cover"
            alt="Shoes" />
            ${
                video.others.posted_date?.length == 0 ? "": `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> ${getTimeString(video.others.posted_date)}
             </span>`
            }
            
             </figure>
                    <div class="px-0 py-2 flex gap-2">
                    <div>
                        <img class="w-8 h-8 rounded-full object-cover" src=${video.authors[0].profile_picture} />
                    </div>

                    <div>
                        <h2 class="font-bold ">${video.title} </h2>
                       <div class="flex items-center gap-2">
                             <p class="text-gray-400">${video.authors[0].profile_name} </p>
                             ${video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' : ""}
                       </div>
                        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
                    </div>
                     
                    </div>
                    `;
            videoContainer.append(card);
    });
    
};
// Create Display Cetagories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    // add data in html
    categories.forEach((item) => {
        console.log(item);
        // Create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;

        // Add button to the categoryContainer
        categoryContainer.append(buttonContainer);

    });
}

loadCategories();
loadVideos();