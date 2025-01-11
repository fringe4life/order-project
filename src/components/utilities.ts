
/**
 * @abstract Finally found and thought up my very own use case of generics!! so happy about this!
 * @param templateId a string for the id of the template tag
 * @returns a HTMLElement of type T
 */
function getChildFromTemplate<T extends HTMLElement>(templateId:string): T{
    const template = document.getElementById(templateId) as HTMLTemplateElement
    
	// clone the template
	const clone = template.content.cloneNode(true) as HTMLTemplateElement;

	const child = clone.children[0] as T;
    return child;
}

export {getChildFromTemplate}