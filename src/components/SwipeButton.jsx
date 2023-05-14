import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function SwipeButton(props){
        return <div className="swipe-buttons">   
        <button className="btn sad-face-button" onClick={props.leftFunction}><SentimentVeryDissatisfiedIcon sx={{ fontSize: 50 }}/></button>
        <button className="btn heart-button" onClick={props.rightFunction}><FavoriteIcon sx={{ fontSize: 50 }}/></button>  
        </div>
}


export default SwipeButton;