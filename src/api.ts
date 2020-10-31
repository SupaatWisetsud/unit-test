const wait = (ms: number) => new Promise(resolve => {
    setTimeout(() => resolve(), ms)
})

export const getHero = async (name: string) => {
    await wait(1000);
    if(name === 'saitama'){
        return {
            name: "Saitama",
            age: 25,
            height: 175
        }
    }
    throw Error()
}