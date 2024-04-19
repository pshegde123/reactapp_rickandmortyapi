import Card from "./Card";

const CardsList = ({charlist}) => {  
    
    const createCard = () =>{
        return charlist.map((item) => {
            return <Card key={item.id} character={item}/>
        })
    }

    return(    
        <ul className="flex flex-wrap gap-4 justify-center mt-4 rounded-md">
            {charlist && createCard()}
        </ul>            
    )
}
export default CardsList;