import { writable } from "svelte/store";
import { LoremIpsum } from 'lorem-ipsum';

export const initialState = [
    {
        tag: `<p style="cursor: pointer;">...</p>`,
        content: `Ea sint et exercitation dolor ut laborum culpa Lorem irure culpa esse. Commodo aliqua minim 
        laboris ullamco id quis ea excepteur velit magna ea. Nisi officia laborum sunt voluptate enim sit magna dolor laborum ex aute. 
        Reprehenderit Lorem qui consectetur dolor eu ea officia laboris id amet consectetur et cupidatat. Dolor in aute tempor fugiat qui irure sint mollit magna. Incididunt mollit aliqua commodo irure officia occaecat dolore nisi exercitation do. 
        Excepteur nostrud fugiat minim ex excepteur ipsum esse veniam nulla consequat eu cillum fugiat nostrud do.`
    }
]

export const togglePopup = writable(null)
export const isRewriteBlog = writable(false)
export const generalObjectBlog = writable({content: initialState, tab: 'article'})
export const flagMainImg  =writable(false)
export const currentIndex = writable( null)
export const startSymbol = writable( null)
export const endSymbol = writable( null)
export const currentImgData = writable({src: '',
    alt: ''
})
export const editableEl = writable(null);
export const indexLi = writable(null);
export const paragraph = writable('');
export const subtitle = writable('');
export const inputList = writable([{ id: 'item-1' }, { id: 'item-2' }])

export  function removeHtmlTags(html) {
    return html.replace(/<[^>]*>/g, '');
}


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

export function hiddenToolTip() {
    const tooltip = document.querySelector('.tooltip-container');
    tooltip.style.opacity = 0;
    tooltip.style.visibility = 'hidden';
}


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


