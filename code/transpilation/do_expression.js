const rawText = "Number integer 100"

const numericValue = do
{
    const parsedText = rawText.split(' ');
    
    if(parsedText[0] == "Number") 
    {
        if(parsedText[1] == "integer")
        {
            Number(parsedText[2]);
        }
    } 
    else 
    {
        "Random stuff";
    }
};

console.log(numericValue);
