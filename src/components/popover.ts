import { getChildFromTemplate } from "./utilities.ts";

function showPopover(templateId:string){
    const popover = getChildFromTemplate<HTMLDivElement>(templateId)
    document.body.appendChild(popover)
    popover.showPopover()
}


export {showPopover}