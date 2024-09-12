import { writable } from "svelte/store";
export const hex = writable("#000000")

export async function uploadPhoto(file){
    if(!file) return 
    const blob = new Blob([file], { type: file.type });
    const formData = new FormData();
    formData.append('image', blob, Date.now() + '-' + Math.round(Math.random() * 1e9));
   
        const response = await fetch('https://api.imgbb.com/1/upload?key=401f89dfe6ab448e7a936805f8cc22af', {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
       
        return data.data.image.url; 

}

