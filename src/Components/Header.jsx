import { Link } from 'react-router-dom'
import tag from 'E:/yash react/AniMangaInfo/AniMangaInfo/src/assets/tag.png'
import logo from 'E:/yash react/AniMangaInfo/AniMangaInfo/src/assets/logo.png'
function Header(){
    return(
        <>
        <div id='header'>
        <div id="heading"><Link to="/"><img src={logo} id='logo'/></Link><Link to="/"><h1 id="title">AniManga Info</h1></Link>
        <Link to="/animangawatchlist"><button id='saved-btn'><img src= {tag} alt="Saved" id='saved-btn-img' /></button></Link>
        </div><p id="description">If it Exists in 2D World, It's Here</p></div>
        </>
    )
}
export default Header