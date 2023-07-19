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
        "meta_title": "Top art journalers available for collaboration",
        "meta_content": "Connect with like-minded art journalers, share your visual stories, and find endless inspiration.",
    },
    {
        "slug": "bullet-journaling",
        "meta_title": "Top bullet journalers available for collaboration",
        "meta_content": "Connect with like-minded bulltet journalers, track your goals, and unlock your productivity potential.",
    },
    {
        "slug": "calligraphy",
        "meta_title": "Top calligraphers available for collaboration",
        "meta_content": "Connect with fellow calligraphers, hone your skills, and showcase your intricate lettering.",
    },
    {
        "slug": "caricature-drawing",
        "meta_title": "Top caricature artists available for collaboration",
        "meta_content": "Connect with fellow caricature artists, showcase your unique style, and unleash your humor and creativity as a caricature artist.",
    },
    {
        "slug": "choreography",
        "meta_title": "Top coreographers available for collaboration",
        "meta_content": "Connect with fellow coreographers, craft mesmerizing routines, and inspire audiences.",
    },
    {
        "slug": "collage-making",
        "meta_title": "Top collage makers available for collaboration",
        "meta_content": "Connect with like-minded collage makers, experiment with mixed media, and unleash your artistic expression through collage making.",
    },
    {
        "slug": "creative-journaling",
        "meta_title": "Top creative journalers available for collaboration",
        "meta_content": "Connect with like-minded creative journalers, share imaginative entries, and find inspiration for your expressive journey.",
    },
    {
        "slug": "creative-writing",
        "meta_title": "Top creative writers available for collaboration",
        "meta_content": "Connect with like-minded creative writers, create, and explore captivating stories, poems, articles etc.",
    },
    {
        "slug": "dancing",
        "meta_title": "Top dancers available for collaboration",
        "meta_content": "Connect with like-minded dancers, showcase your moves, and embrace the rhythm of tunes in the world of dance.",
    },
    {
        "slug": "digital-art",
        "meta_title": "Top digital artists available for collaboration",
        "meta_content": "Connect with fellow digital artists, explore creative ideas, and craft compelling work.",
    },
    {
        "slug": "doodling",
        "meta_title": "Top doodlers available for collaboration",
        "meta_content": "Connect with fellow doodlers, share your whimsical creations, and let your imagination shine by working with others.",
    },
    {
        "slug": "guitar-playing",
        "meta_title": "Top guitarist available for collaboration",
        "meta_content": "Connect with fellow guitarists, share your melodies, harmonize with the community and strum your way to greatness.",
    },
    {
        "slug": "hand-lettering",
        "meta_title": "Top hand letterers available for collaboration",
        "meta_content": "Master the art of hand lettering. Connect with skilled artists, showcase your elegant designs, and elevate your craft.",
    },
    {
        "slug": "illustration",
        "meta_title": "Top illustrators available for collaboration",
        "meta_content": "Unleash your imagination as an illustrator. Connect with fellow artists, showcase your visual stories, and find endless inspiration.",
    },
    {
        "slug": "journaling",
        "meta_title": "Top journalers available for collaboration",
        "meta_content": "Connect with like-minded illustrators, express, and document your journey.",
    },
    {
        "slug": "musicians",
        "meta_title": "Top musicians available for collaboration",
        "meta_content": "Join fellow musicians in a harmonious space. Connect, collaborate, and share your melodies dedicated to passionate music makers.",
    },
    {
        "slug": "painting",
        "meta_title": "Top painters available for collaboration",
        "meta_content": "Immerse yourself in the world of painting. Connect with fellow artists, exhibit your masterpieces, and embrace the colors.",
    },
    {
        "slug": "photography",
        "meta_title": "Top photographers available for collaboration",
        "meta_content": "Capture moments, share stories. Connect with photographers, showcase your artistry, and explore the world through lenses.",
    },
    {
        "slug": "poetry",
        "meta_title": "Top poets available for collaboration",
        "meta_content": "Compose verses that touch hearts. Connect with fellow poets, share your emotions, and let your words paint vivid emotions.",
    },
    {
        "slug": "scrapbooking",
        "meta_title": "Top scrapbookers available for collaboration",
        "meta_content": "Preserve memories with scrapbooking. Connect with enthusiasts, showcase your creative layouts, and cherish life's moments.",
    },
    {
        "slug": "singing",
        "meta_title": "Top singers available for collaboration",
        "meta_content": "Elevate your voice through singing. Connect with vocalists, share your melodies, and let the music resonate for passionate singers.",
    },
    {
        "slug": "sketching",
        "meta_title": "Top sketchers available for collaboration",
        "meta_content": "Connect with sketchers, share your sketches, and explore endless possibilities on wondor for passionate sketchers.",
    },
    {
        "slug": "spoken-words",
        "meta_title": "Top spoken words artists available for collaboration",
        "meta_content": "Embrace the power of spoken word. Connect with fellow artists, share your compelling performances, and ignite minds on wondor for spoken word artists.",
    },
    {
        "slug": "standup-comedy",
        "meta_title": "Top standup comedians available for collaboration",
        "meta_content": "Spread laughter with stand-up comedy. Connect with comedians, share your humor, and bring joy to audiences on wondor for stand-up performers.",
    },
    {
        "slug": "writing",
        "meta_title": "Writers available for collaboration",
        "meta_content": "Connect with fellow writers, explore creative ideas, and craft compelling stories on wondor.",
    }
]