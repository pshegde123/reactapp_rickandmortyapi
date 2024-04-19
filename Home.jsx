import { useState,useEffect, useDebugValue } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import Button from './components/Button'
import Footer from './components/Footer'
import CardsList from './components/CardList'
import Error from './components/Error'

function Home() {
    const[initData,setInitData] = useState();
    const[characters,setCharacters] = useState()
    const[searchTermCharacters, setSearchTermCharacters] = useState();
    const[noResults, setNoResults] = useState(false);
    const[totalResults, setTotalResults] = useState();
    const[totalPages, setTotalPages] = useState();
    const[currentPage, setCurrentPage] = useState(1);


    const searchTerm = (e) =>{
        //console.log(e.target.value)
        setSearchTermCharacters(e.target.value)  
        searchCharacters()      
    } 
    const searchCharacters=()=>{
        if(searchTermCharacters){
            const searchResults = characters.filter((character)=>character.name.toLowerCase().includes(searchTermCharacters.toLowerCase()))
            setCharacters(searchResults)
            setNoResults(searchResults.length === 0);            
        }else{
            setCharacters(initData)
        }        
    }    
    const getCharacters = async (page=1) =>{
        try{
               const data = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
               const response = await data.json()
               console.log(response);  
               setCharacters(response.results)
               setInitData(response.results);
               setTotalResults(response.info.count);
               setTotalPages(response.info.pages);
        }   
        catch(err){
            console.log(err);
        }
    }
    const handlePageChange=(newPage)=>{
        setCurrentPage(newPage);
        getCharacters(newPage)
    }

    useEffect(() => {getCharacters()},[])
  return(
    <section>
      <Header/>
      <Input type="search" placeholder="type your character" changeHandler={searchTerm}/>
      {totalResults && <p>Total characters are:<span className='font-bold'>{totalResults}</span></p>}
      { noResults?<Error/>:<CardsList charlist={characters}/>}
      {totalPages && <div className='flex gap-4 my-4 justify-center'>
        <Button 
        classes={currentPage === 1? "bg-gray-600 text-white rounded-md p-2":"bg-black text-white rounded-md p-2"}
        label="Prev"         
        onClickHandler={() => {handlePageChange(currentPage-1)}}
        disabled = {currentPage === 1}/>
      <p> Page {currentPage} of {totalPages} </p>
      <Button 
      label="Next"       
      classes={currentPage === totalPages ? "bg-gray-600 text-white rounded-md p-2":"bg-black text-white rounded-md p-2"}
      onClickHandler={() => {handlePageChange(currentPage+1)}}
      disabled = { currentPage === totalPages}/>
      </div>}
      <Footer/>
    </section>
  )
  
}

export default Home
