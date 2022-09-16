type ID = number | string;

function printId2(id: ID )
{
    if (typeof id === "string")
    {
        console.log(id.toUpperCase());
    }
    else
    {
        console.log(id);
    }
}

printId2("202");