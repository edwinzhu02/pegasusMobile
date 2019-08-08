export const statistics = (models) => {
    const star = {one:0,two:0,three:0,four:0,five:0}
    models.forEach(s=>{
        if (s.RateStar == 1){
            star.one += 1
        }else if (s.RateStar ==2){
            star.two+= 1
        }else if (s.RateStar == 3){
            star.three+= 1
        }else if (s.RateStar ==4){
            star.four+= 1
        }else{
            star.five+= 1
        }
    })
    let total = 0;
    models.forEach(s=>{
        total += s.RateStar
    })
    const average = Math.round((total/ models.length) *10) /10
    if (models.length ==0){
        return {average: 0,star:star}
    }
    return {average: average, star: star }
}
