import dosa1 from '../assets/images/multigrain_dosa.png'
import dosa2 from '../assets/images/multigrain_dosa_back_view.png'
import dosa3 from '../assets/images/multigrain_dosa_ingredients.png'
import dosa4 from '../assets/images/multigrain_dosa_nutrition.png'
import dosa5 from '../assets/images/multigrain_dosa_progress.png'


const product_data = {
    product_details: {
        id: 1,
        title: 'Multi Gram Dosa',
        description: 'A ready dosa mix without going through the hassle of soaking, grinding, and preparing the batter. Just add water and salt, rest for few minutes, and start making tasty and healthy dosas. We have combined 80% sprouted green gram with nutritious moringa leaves and spices for a power-packed quick meal any time of the day.',
        original_price: '125',
        offer_price: '120',
        single_image: dosa1,
        images: [dosa1, dosa2, dosa3, dosa4, dosa5],
        pack_sizes: [
            {weight: '100', price: '125', offer_price: '120'},
            {weight: '250', price: '335', offer_price: '300'},
            {weight: '500', price: '410', offer_price: '380'},
            {weight: '1', price: '520', offer_price: '480'},
        ]
    },
    benifits: {
        title: 'Benifits',
        description: 'Reduces gastritis, help cure mouth sores, superfood for new mothers, Relieves fatigue and tiredness, Effective against common cold and cough, Helps cure an upset stomach, Diabetic friendly, Helps reduce cholesterol',
    },
    Ingredients : {
        title: 'Ingredients',
        description: 'Ingredients - Black Nightshade Berry, Turkey Berry, Dried Neem Flower, Coriander Seeds, Cumin Seeds, Black Pepper Corns, Compounded Asafoetida, Salt',
    },
    how_to_use: {
        title: 'How to use?',
        description: 'RealVedic Angaya Powder is a multipurpose nutritious mix of exotic ingredients and has a variety of uses depending upon what one wants to treat. It can be had with hot rice along with melted ghee. It can be served as an accompaniment to curd rice. It can be mixed in hot water and taken as a tea to cure sore throat, cold and upset stomach. It can be mixed with sesame oil and served as an accompaniment with Idly, Dosa, and Uttappam.',
    },
    how_we_make_it: {
        title: 'How we make it?',
        description: 'We prefer manufacturing our products in small batches to maintain the standard and quality. Each ingredient is handpicked carefully and then roasted to perfection. It is then blended and stored in a clean and hygienic place before it is delivered to your doorstep.',
    },
    nutrition: {
        title: 'Nutritional Info per 100g (Approx)*',
        values: [
            {title: 'Total Fat', value: '3.2 g'},
            {title: 'Protien', value: '10 g'},
            {title: 'Carbohydrate   ', value: '70.2 g'},
            {title: 'Energy', value: '348.6 kcal'},
        ],
    },
};

export default product_data