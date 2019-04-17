let photoPosts = [
    {id: "1",
        description: "Earth view from google number two",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1024.jpg",
        likes: "0"
    },
    {id: "2",
        description: "Earth view from google number two",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "Иванов Иван",
        photoLink: "images/google-earth-view-1064.jpg",
        likes: "2"
    },
    {id: "3",
        description: "Earth view from google number three",
        createdAt: new Date("2019-03-15"),
        location: "Minsk, Belarus",
        author: "Tim",
        photoLink: "images/google-earth-view-1402.jpg",
        likes: "0"
    },
    {id: "4",
        description: "Earth view from google number four",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1494.jpg",
        likes: "0"
    },
    {id: "5",
        description: "Earth view from google number five",
        createdAt: new Date("2019-03-11"),
        location: "Belarus",
        author: "Ivanov Ivan",
        photoLink: "images/google-earth-view-1868.jpg",
        likes: "5"
    },
    {id: "6",
        description: "Earth view from google number six",
        createdAt: new Date("2019-03-15"),
        location: "Minsk",
        author: "KastG",
        photoLink: "images/google-earth-view-2102.jpg",
        likes: "11"
    },
    {id: "7",
        description: "should be removed",
        createdAt: new Date("2019-03-11"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-2154.jpg",
        likes: "10"
    },
    {id: "8",
        description: "qaqaqaqaqqaaqaq",
        createdAt: new Date("2019-03-18"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-2380.jpg",
        likes: "20"
    },
    {id: "9",
        description: "Earth view from google number nine",
        createdAt: new Date("2019-03-12"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-5023.jpg",
        likes: "26"
    },
    {id: "10",
        description: "Earth view from google number ten",
        createdAt: new Date("2019-03-13"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-5051.jpg",
        likes: "6"
    }
];

if(localStorage.getItem('posts') === null)
{
    console.log('Loading default posts to local storage');
    localStorage.setItem('posts', JSON.stringify(photoPosts));
    let arr = [];
    localStorage.setItem('likedPosts', JSON.stringify(arr));
    localStorage.setItem('posts_number',JSON.stringify(photoPosts.length));
}







