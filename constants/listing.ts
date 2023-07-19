import writerImage from '../public/images/popularCategories/writingbg.svg';
import cameramanImage from '../public/images/popularCategories/camerabg.svg';
import doodleImage from '../public/images/popularCategories/doodle.svg';
import illustratorImage from '../public/images/popularCategories/illustrator.svg';
import dancingImage from '../public/images/popularCategories/dancing.svg';
import paintingImage from '../public/images/popularCategories/paintingbg.svg'
import singingImage from '../public/images/popularCategories/singingbg.svg'
import photographerImage from '../public/images/popularCategories/photographer.svg'
import artistImage from '../public/images/popularCategories/artist.svg';
import sketchingImage from '../public/images/popularCategories/sketching.svg';
import handLetteringbgImage from '../public/images/popularCategories/handLetteringbg.svg';
import musicImage from '../public/images/popularCategories/musicbg.svg';

export const LISTING_BANNERS = [
    {
        "slugs": ["artist"],
        "category": "you",
        "image": artistImage,
        "background_color": "#ECCFD6",
    },
    {
        "slugs": ["writing", "creative-writing", "poetry", "spoken-words"],
        "category": "Writing",
        "image": writerImage,
        "background_color": "#EDC5CD",
    },
    {
        "slugs": ["photography"],
        "category": "Photography",
        "image": cameramanImage,
        "background_color": "#FFDAC1",
    },
    {
        "slugs": ["illustration", "digital-art"],
        "category": "Digital Art",
        "image": illustratorImage,
        "background_color": "#FFDAC1",
    },
    {
        "slugs": ["dancing", "choreography"],
        "category": "Dancing",
        "image": dancingImage,
        "background_color": "#FFDAC1",
    },

    {
        "slugs": ["painting"],
        "category": "Painting",
        "image": paintingImage,
        "background_color": "#C7CEEA",
    },
    {
        "slugs": ["hand-lettering", "calligraphy"],
        "category": "Hand Lettering",
        "image": handLetteringbgImage,
        "background_color": "#FBF0C4",
    },
    {
        "slugs": ["sketching"],
        "category": "Painting",
        "image": sketchingImage,
        "background_color": "#FADAC1",
    },
    {
        "slugs": ["singing", "standup-comedy"],
        "category": "Singing",
        "image": singingImage,
        "background_color": "#FADAC1",
    },
    {
        "slugs": ["music"],
        "category": "Music",
        "image": musicImage,
        "background_color": "#E2F0CB",
    },
    {
        "slugs": ["journaling", "art-journaling", "creative-journaling", "bullet-journaling", "scrapbooking", "collage-making"],
        "category": "Journaling",
        "image": writerImage,
        "background_color": "#EDC5CD",
    },
    {
        "slugs": ["doodling", "caricature-drawing"],
        "category": "Doodling",
        "image": doodleImage,
        "background_color": "#B5EAD7",
    },
]

export const SIMILAR_CATEGORIES = [
    {
        "slugs": ["writing", "creative-writing", "poetry", "spoken-words", "calligraphy"],
        "similar_categories": [
            {
                "name": "Writing",
                "slug": "writing"
            },
            {
                "name": "Creative Writing",
                "slug": "creative-writing"
            },
            {
                "name": "Poetry",
                "slug": "poetry"
            },
            {
                "name": "Spoken Words",
                "slug": "spoken-words"
            },
            {
                "name": "Calligraphy",
                "slug": "calligraphy"
            }
        ]
    },
    {
        "slugs": ["photography", "illustration"],
        "similar_categories": [
            {
                "name": "Photography",
                "slug": "photography"
            },
            {
                "name": "Illustration",
                "slug": "illustration"
            },
        ]
    },
    {
        "slugs": ["digital-art", "illustration"],
        "similar_categories": [
            {
                "name": "Illustration",
                "slug": "illustration"
            },
            {
                "name": "Digital Art",
                "slug": "digital-art"
            }
        ]
    },
    {
        "slugs": ["dancing", "choreography"],
        "similar_categories": [
            {
                "name": "Dancing",
                "slug": "dancing"
            },
            {
                "name": "Choreography",
                "slug": "choreography"
            }
        ]
    },
    {
        "slugs": ["painting", "caricature-drawing", "sketching", "doodling"],
        "similar_categories": [
            {
                "name": "Painting",
                "slug": "painting"
            },
            {
                "name": "Caricature Drawing",
                "slug": "caricature-drawing"
            },
            {
                "name": "Sketching",
                "slug": "sketching"
            },
            {
                "name": "Doodling",
                "slug": "doodling"
            }
        ]
    },
    {
        "slugs": ["journaling", "art-journaling", "creative-journaling", "bullet-journaling", "scrapbooking", "collage-making"],
        "similar_categories": [
            {
                "name": "Art Journaling",
                "slug": "art-journaling"
            },
            {
                "name": "Creative Journaling",
                "slug": "creative-journaling"
            },
            {
                "name": "Bullet Journaling",
                "slug": "bullet-journaling"
            },
            {
                "name": "Scrapbooking",
                "slug": "scrapbooking"
            },
            {
                "name": "Collage Making",
                "slug": "collage-making"
            },
            {
                "name": "Journaling",
                "slug": "journaling"
            }
        ]
    },
    {
        "slugs": ["hand-lettering", "calligraphy", "writing"],
        "similar_categories": [
            {
                "name": "Hand Lettering",
                "slug": "hand-lettering"
            },
            {
                "name": "Calligraphy",
                "slug": "calligraphy"
            },
        ]
    },
    {
        "slugs": ["singing", "standup-comedy"],
        "similar_categories": [
            {
                "name": "Singing",
                "slug": "singing"
            },
            {
                "name": "Standup Comedy",
                "slug": "standup-comedy"
            }
        ]
    },
    {
        "slugs": ["music"],
        "similar_categories": [
            {
                "name": "Music",
                "slug": "music"
            },
        ]
    },
]

export const LISTING_METADATA = [
    {
        "slug": "art-journaling",
        "meta_title": "Art journalers available for collaboration",
        "meta_content": "Connect with like-minded art journalers, share your visual stories, and find endless inspiration.",
    },
    {
        "slug": "bullet-journaling",
        "meta_title": "Bullet journalers available for collaboration",
        "meta_content": "Connect with like-minded bulltet journalers, track your goals, and unlock your productivity potential.",
    },
    {
        "slug": "calligraphy",
        "meta_title": "Calligraphers available for collaboration",
        "meta_content": "Connect with fellow calligraphers, hone your skills, and showcase your intricate lettering.",
    },
    {
        "slug": "caricature-drawing",
        "meta_title": "Caricature artists available for collaboration",
        "meta_content": "Connect with fellow caricature artists, showcase your unique style, and unleash your humor and creativity as a caricature artist.",
    },
    {
        "slug": "choreography",
        "meta_title": "Coreographers available for collaboration",
        "meta_content": "Connect with fellow coreographers, craft mesmerizing routines, and inspire audiences.",
    },
    {
        "slug": "collage-making",
        "meta_title": "Collage makers available for collaboration",
        "meta_content": "Connect with like-minded collage makers, experiment with mixed media, and unleash your artistic expression through collage making.",
    },



    {
        "slug": "writing",
        "meta_title": "Writers available for collaboration",
        "meta_content": "Connect with fellow writers, explore creative ideas, and craft compelling stories on our platform.",
    }
]