import { writable } from "svelte/store";
import { LoremIpsum } from 'lorem-ipsum';

export const currentIndex = writable( null)
export const startSymbol = writable( null)
export const endSymbol = writable( null)
export const  togglePPopup  =writable(false)
export const  toggleListPopup  =writable(false)
export const  toggleImgPopup  =writable(false)
export const  toggleAPopup  =writable(false)
export const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

export const value = writable([
    {
        tag: `<p style="cursor: pointer;">...</p>`,
        content: lorem.generateParagraphs(1)
    }
])

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


