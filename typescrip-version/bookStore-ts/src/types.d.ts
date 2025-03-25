type Product = {
    id: number
    name: string
    image: string
    description: string
    price: number
    link: string
}

// Add CSS module declarations
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}