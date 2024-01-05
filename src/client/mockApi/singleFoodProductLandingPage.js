import img from '../assets/images/single_product.png'
import yt from '../assets/images/youtube.png'
import vision from '../assets/images/our_vison.png'

const foodDetails = {
    video_data: {
        video: 'https://www.youtube.com/watch?v=d4XJfTrF8kE',
        title: 'Some of our remedies!',
    },
    food: {
        title: 'Kokum Rasam | Instant Mix',
        image: img,
        price: '110.0',
        weight: '250'
    },
    blog: {
        title: 'Our Vison!',
        content: 'At Thewy Remedy Pvt Ltd., we strongly believe that our knowledge, actions and customer centric approach will propel us to improve the quality of the life by making quality products accessible to people at an affordable price.:',
        points: ['Soaking rice and lentils', 'Making dosa batter in a blender or mixer-grinder', 'Fermenting dosa batter', 'Making dosa'],
        image: vision,
    }
}

export default foodDetails