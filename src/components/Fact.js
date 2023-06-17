import supabase from "../supabase";
import { useState } from "react";

function Fact({
    fact , categories , setFacts , setCurrentCategory
}) {
    const [ isUploading , setIsUploading ] = useState(false);
    const isDisputed = 
    fact.votesInteresting + fact.votesMindBlowing + fact.votesFalse;


    async function handleVote(column){
        setIsUploading(true);
        const { data : newFact , error } = await supabase
            .from("facts")
            .update({ [column] : ++fact[column] })
            .eq("id" , fact.id)
            .select()

        setIsUploading(false);
        if(!error)
            setFacts((facts)=>
                facts.map((f)=>(f.id === fact.id ? newFact[0]:f))
                );
        else alert("there was a problem voting")

    }
}


export default Fact ;