import { writable } from "svelte/store";
import { LoremIpsum } from 'lorem-ipsum';

export const isRewriteBlog = writable(false)
export const generalObjectBlog = writable({})
export const textForChanges = writable(null)
export const flagMainImg  =writable(false)
export const currentIndex = writable( null)
export const startSymbol = writable( null)
export const endSymbol = writable( null)
export const togglePPopup  =writable(false)
export const toggleSubtitle  =writable(false)
export const toggleDeletePopup  =writable(false)
export const toggleListPopup  =writable(false)
export const toggleImgPopup  =writable(false)
export const toggleAPopup  =writable(false)
export const toggleTitlePopup  =writable(false)
export const toggleSeoAndOtherPopup  =writable(false)
export const currentImgData = writable({src: '',
    alt: ''
})
export const editableEl = writable(null);
export const indexLi = writable(null);
export const title = writable('')
export const titleseo = writable('')
export const slug = writable('')
export const descriptionseo = writable('')
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

export const value = writable([
    {
        tag: `<p style="cursor: pointer;">...</p>`,
        content: `Ea sint et exercitation dolor ut laborum culpa Lorem irure culpa esse. Commodo aliqua minim 
        laboris ullamco id quis ea excepteur velit magna ea. Nisi officia laborum sunt voluptate enim sit magna dolor laborum ex aute. 
        Reprehenderit Lorem qui consectetur dolor eu ea officia laboris id amet consectetur et cupidatat. Dolor in aute tempor fugiat qui irure sint mollit magna. Incididunt mollit aliqua commodo irure officia occaecat dolore nisi exercitation do. 
        Excepteur nostrud fugiat minim ex excepteur ipsum esse veniam nulla consequat eu cillum fugiat nostrud do.`
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


