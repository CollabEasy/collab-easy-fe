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


export const CATEGORY_METADATA = [
    // {
    //     "slug": "artists",
    //     "name": "Artists",
    //     "image": artistImage,
    //     "background-color": "#EDC5CD",
    //     "artist-title": "Artists",
    //     "similar-categories": [],
    //     "wiki-data": {
    //         "url": "learn-about-collaboration-opportunities",
    //         "meta-title": "Learn about collaboration opportunities with artists | Wondor",
    //         "meta-content": "Learn about the enchanting world of this unique art style - its definition, techniques, and how it fuses creativity and self-expression in a visual diary.",
    //     },
    //     "listing-data": {
    //         "meta-title": "Artists available for collaboration | Wondor",
    //         "meta-content": "Find Artists available for collaboration. Connect with like-minded artists and share your stories, and find endless inspiration | Wondor ",
    //     }
    // },
    {
        "slug": "art-journaling",
        "name": "Art Journaling",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Art Journalers",
        "similar-categories": [
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
        ],
        "wiki-data": {
            "url": "learn-about-art-journaling-and-collaboration-opportunities",
            "meta-title": "Learn about Art Journaling and collaboration opportunities with journalers | Wondor",
            "meta-content": "Learn about the enchanting world of art journaling - its definition, techniques, and how it fuses creativity and self-expression in a visual diary.",
            "paragraph": "Simply put, Art Journaling is a visual diary--it's record keeping combined with creativity! It’s a place to record your thoughts, memories, and emotions through images, art and words. An art journal is the same as a written journal, except that it incorporates colors, images, patterns, and other materials. Some art journals have a lot of writing, while others are purely filled with images. It’s a form of creative self-care.",
            "source": "https://shoptangiebaxter.com/pages/what-is-art-journaling",
        },
        "listing-data": {
            "meta-title": "Top Art Journalers available for collaboration | Wondor",
            "meta-content": "Find Art Journalers available for collaboration. Connect with like-minded art journalers, share your visual stories, and find endless inspiration | Wondor ",
        }
    },
    {
        "slug": "bullet-journaling",
        "name": "Bullet Journaling",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Bullet Journalers",
        "similar-categories": [
            {
                "name": "Art Journaling",
                "slug": "art-journaling"
            },
            {
                "name": "Creative Journaling",
                "slug": "creative-journaling"
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
        ],
        "wiki-data": {
            "url": "learn-about-bullet-journaling-and-collaboration-opportunities",
            "meta-title": "Learn about Bullet Journaling and collaboration opportunities with journalers | Wondor",
            "meta-content": "Discover the art of bullet journaling - a versatile and organized way to plan, track, and express your life. Get started on your creative journey now!",
            "paragraph": "Bullet Journaling is just one of many journaling methods that can improve your mental health, boost creativity, and even help you sleep better. But it differs from most types of journaling in that it specifically involves goal planning, organization, and, in many cases, wildly creative visual imagery. Bullet Journaling allows you to organize your mind and life while also expressing your individual style.",
            "source": "https://www.dailyom.com/journal/bullet-journaling-for-beginners-tips-to-get-started/",
        },
        "listing-data": {
            "meta-title": "Top Bullet Journalers available for collaboration | Wondor",
            "meta-content": "Find Bullet Journalers available for collaboration. Connect with like-minded bulltet journalers, track your goals, and unlock your productivity potential | Wondor",
        },
    },
    {
        "slug": "calligraphy",
        "name": "Calligraphy",
        "image": handLetteringbgImage,
        "background-color": "#FBF0C4",
        "artist-title": "Calligraphers",
        "similar-categories": [
            {
                "name": "Hand Lettering",
                "slug": "hand-lettering"
            },
        ],
        "wiki-data": {
            "url": "learn-about-calligraphy-and-collaboration-opportunities",
            "meta-title": "Learn about Calligraphy and collaboration opportunities with calligraphers | Wondor",
            "meta-content": "Discover the art of Calligraphy: Learn its history, techniques, and the beauty of elegant writing. Unleash your creativity today!",
            "paragraph": "Calligraphy is more than beautiful handwriting or ornate lettering techniques. Calligraphy is the art of forming beautiful symbols by hand and arranging them well. It is a set of skills and techniques for positioning and inscribing words so they show integrity, harmony, some sort of ancestry, rhythm and creative fire.",
            "source": "https://www.calligraphy-skills.com/what-is-calligraphy.html",
        },
        "listing-data": {
            "meta-title": "Top Calligraphers available for collaboration | Wondor",
            "meta-content": "Find Calligraphers available for collaboration. Connect with fellow calligraphers, hone your skills, and showcase your intricate lettering | Wondor",
        },
    },
    {
        "slug": "caricaturing",
        "name": "Caricaturing",
        "image": doodleImage,
        "background-color": "#B5EAD7",
        "artist-title": "Caricaturists",
        "similar-categories": [
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
            },
        ],
        "wiki-data": {
            "url": "learn-about-caricaturing-and-collaboration-opportunities",
            "meta-title": "Learn about Caricaturing and collaboration opportunities with caricatures | Wondor",
            "meta-content": "Explore the world of Caricature Drawing: Learn its humor and artistry, create fun portraits with exaggerated features. Start sketching now!",
            "paragraph": "Caricature is a drawing style that often shows up as extreme portraits of political figures or wacky boardwalk souvenirs. But there’s more to caricatures than just big noses and other exaggerated facial features. Creating whimsical depictions of people — from the media or real life — by drawing caricatures can help you get better at illustrating real, three-dimensional characters. “A caricature gets to the essence of who someone is and not just what they look like, but what their personality is,” says caricaturist Greg Bigoni.",
            "source": "https://www.adobe.com/creativecloud/illustration/discover/how-to-draw-caricature.html",
        },
        "listing-data": {
            "meta-title": "Top Caricature makers available for collaboration | Wondor",
            "meta-content": "Find Caricature makers available for collaboration. Connect with fellow caricature artists, showcase your unique style, and unleash your humor and creativity as a caricature artist | Wondor",
        },
    },
    {
        "slug": "caricature-drawing",
        "name": "Caricature Drawing",
        "image": doodleImage,
        "background-color": "#B5EAD7",
        "artist-title": "Caricaturists",
        "similar-categories": [
            {
                "name": "Painting",
                "slug": "painting"
            },
            {
                "name": "Sketching",
                "slug": "sketching"
            },
            {
                "name": "Doodling",
                "slug": "doodling"
            },
            {
                "name": "Caricaturing",
                "slug": "caricaturing",
            }
        ],
        "wiki-data": {
            "url": "learn-about-caricature-drawing-and-collaboration-opportunities",
            "meta-title": "Learn about Caricature Drawing and collaboration opportunities with caricatures | Wondor",
            "meta-content": "Explore the world of Caricature Drawing: Learn its humor and artistry, create fun portraits with exaggerated features. Start sketching now!",
            "paragraph": "Caricature is a drawing style that often shows up as extreme portraits of political figures or wacky boardwalk souvenirs. But there’s more to caricatures than just big noses and other exaggerated facial features. Creating whimsical depictions of people — from the media or real life — by drawing caricatures can help you get better at illustrating real, three-dimensional characters. “A caricature gets to the essence of who someone is and not just what they look like, but what their personality is,” says caricaturist Greg Bigoni.",
            "source": "https://www.adobe.com/creativecloud/illustration/discover/how-to-draw-caricature.html",
        },
        "listing-data": {
            "meta-title": "Top Caricature makers available for collaboration | Wondor",
            "meta-content": "Find Caricature makers available for collaboration. Connect with fellow caricature artists, showcase your unique style, and unleash your humor and creativity as a caricature artist | Wondor",
        },
    },
    {
        "slug": "choreography",
        "name": "Choreography",
        "image": dancingImage,
        "background-color": "#FFDAC1",
        "artist-title": "Choreographers",
        "similar-categories": [
            {
                "name": "Dancing",
                "slug": "dancing"
            },
        ],
        "wiki-data": {
            "url": "learn-about-choreography-and-collaboration-opportunities",
            "meta-title": "Learn about Choreography and collaboration opportunities with choreographers | Wondor",
            "meta-content": "Discover the essence of Choreography: The art of dance creation and expression. Unveil the magic of movement and rhythm. Explore now!",
            "paragraph": "It’s the art of creating and arranging dances. a choreographer creates a routine for a dancer (or a group of dancers) to perform. Choreographers incorporate a range of elements into their work, including music, floor patterns, a narrative or storyline, the expression of emotions, and the audience’s perception.",
            "source": "",
        },
        "listing-data": {
            "meta-title": "Top choreographers available for collaboration | Wondor",
            "meta-content": "Find choreographers available for collaboration. Connect with fellow coreographers, craft mesmerizing routines, and inspire audiences | Wondor",
        },
    },
    {
        "slug": "collage-making",
        "name": "Collage Making",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Collage Makers",
        "similar-categories": [
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
                "name": "Journaling",
                "slug": "journaling"
            }
        ],
        "wiki-data": {
            "url": "learn-about-collage-making-and-collaboration-opportunities",
            "meta-title": "Learn about Collage Making and collaboration opportunities | Wondor",
            "meta-content": "Discover Collage Making: Unleash your creativity through visual storytelling. Learn techniques to craft stunning collages. Start creating today!",
            "paragraph": "Collage is an art form which is made up of overlapping pieces of material, such as photographs, fabric, coloured and textured paper and other types of mixed media. The process focuses on the act of selecting materials and cutting them into the desired shape, before arranging them and pasting them onto the chosen surface.",
            "source": "https://www.riseart.com/guide/2371/a-guide-to-collage",
        },
        "listing-data": {
            "meta-title": "Top Collage Makers available for collaboration | Wondor",
            "meta-content": "Find Collage Makers available for collaboration. Connect with like-minded collage makers, experiment with mixed media, and unleash your artistic expression through collage making | Wondor",
        }
    },
    {
        "slug": "creative-journaling",
        "name": "Creative Journaling",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Creative Journalers",
        "similar-categories": [
            {
                "name": "Writing",
                "slug": "writing"
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
        ],
        "wiki-data": {
            "url": "learn-about-creative-journaling-and-collaboration-opportunities",
            "meta-title": "Learn about Creative Journaling and collaboration opportunities with journalers | Wondor",
            "meta-content": "Explore Creative Journaling: A unique outlet for self-expression, imagination, and personal growth. Start your artistic journey now!",
            "paragraph": "Creative journals are essentially a place for you to store your creative ideas, practice your art and overall hone your skills. With it, you can keep your creative juices flowing and your motivation to create art going strong.",
            "source": "https://blog.journey.cloud/how-to-start-a-creative-journal",
        },
        "listing-data": {
            "meta-title": "Top Creative Journalers available for collaboration | Wondor",
            "meta-content": "Find Creative Journalers available for collaboration. Connect with like-minded creative journalers, share imaginative entries, and find inspiration for your expressive journey | Wondor",
        },
    },
    {
        "slug": "creative-writing",
        "name": "Creative Writing",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Creative Writers",
        "similar-categories": [
            {
                "name": "Writing",
                "slug": "writing"
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
        ],
        "wiki-data": {
            "url": "learn-about-creative-writing-and-collaboration-opportunities",
            "meta-title": "Lean about Creative Writing and collaboration opportunities with writers | Wondor",
            "meta-content": "Explore the world of creative writing - its definition, techniques, and endless possibilities. Unleash your imagination and craft captivating stories. Connct with writers and Collaborate | Wondor",
            "paragraph": "Creative writing is the process of crafting original and imaginative works of literature, poetry, prose, or scripts. It transcends conventional writing, encouraging individuals to explore language, structure, and narrative. Whether it's a heartfelt poem, a captivating short story, or a thought-provoking novel, creative writing allows us to communicate our unique perspectives and experiences with the world. Creative writing is a remarkable voyage that invites us to unleash our imagination, share our stories, and inspire others. It offers countless personal and professional benefits, nurturing self-expression, empathy, and creativity. So, grab a pen, open your mind, and embark on this enchanting journey of creative writing.",
            "source": "https://oxfordsummercourses.com/articles/what-is-creative-writing/"
        },
        "listing-data": {
            "meta-title": "Top Creative Writers available for collaboration | Wondor",
            "meta-content": "Find Creative Writers available for collaboration. Connect with like-minded creative writers, create, and explore captivating stories, poems, articles etc | Wondor",
        },
    },
    {
        "slug": "dancing",
        "name": "Dancing",
        "image": dancingImage,
        "background-color": "#FFDAC1",
        "artist-title": "Dancers",
        "similar-categories": [
            {
                "name": "Choreography",
                "slug": "choreography"
            }
        ],
        "wiki-data": {
            "url": "learn-about-dancing-and-collaboration-opportunities",
            "meta-title": "Lean about Dancing and collaboration opportunities with dancers | Wondor",
            "meta-content": "Explore Dancing: The art of expression through movement and rhythm. Discover various dance styles and unleash your passion on the dance floor!",
            "paragraph": "Dancing is the act of rhythmically moving the body and feet. This is usually done to music, and the dancer often follows an established pattern of steps. Styles range from ballroom, which is danced by couples, to performance arts like ballet, where individuals dance as part of a troupe.",
            "source": "https://reference.jrank.org/fitness/Dance.html",
        },
        "listing-data": {
            "meta-title": "Top Dancers available for collaboration | Wondor",
            "meta-content": "Find Dancers available for collaboration. Connect with like-minded dancers, showcase your moves, and embrace the rhythm of tunes in the world of dance | Wondor",
        },
    },
    {
        "slug": "digital-art",
        "category": "Digital Art",
        "image": illustratorImage,
        "background-color": "#FFDAC1",
        "artist-title": "Digital Artists",
        "similar-categories": [
            {
                "name": "Illustration",
                "slug": "illustration"
            },
        ],
        "wiki-data": {
            "url": "learn-about-digital-art-and-collaboration-opportunities",
            "meta-title": "Lean about Digital Art and collaboration opportunities | Wondor",
            "meta-content": "Discover Digital Art: The fusion of technology and creativity. Unleash your imagination with digital tools for stunning visual masterpieces!",
            "paragraph": "Digital art is any artwork that draws upon digital technology as an essential part of its creative process. It encompasses a wide range of techniques, from digital drawings, paintings and illustration, to photos, videos and even sculpture. All can be classed as digital art, so long as they’re created, enhanced or exhibited digitally.",
            "source": "https://www.adobe.com/uk/creativecloud/illustration/discover/digital-art.html",
        },
        "listing-data": {
            "meta-title": "Top Digital Art makers available for collaboration | Wondor",
            "meta-content": "Find Digital Art makers available for collaboration. Connect with fellow digital artists, explore creative ideas, and craft compelling work | Wondor",
        },
    },
    {
        "slug": "doodling",
        "name": "Doodling",
        "image": doodleImage,
        "background-color": "#B5EAD7",
        "artist-title": "Doodlers",
        "similar-categories": [
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
                "name": "Caricaturing",
                "slug": "caricaturing",
            }
        ],
        "wiki-data": {
            "url": "learn-about-doodling-and-collaboration-opportunities",
            "meta-title": "Lean about Doodling and collaboration opportunities with doodlers | Wondor",
            "meta-content": "Explore Doodling: The art of spontaneous creativity. Unleash your imagination and create playful, unique designs effortlessly. Start doodling now!",
            "paragraph": "Doodling is the act of creating drawings in an unconscious or unfocused manner. While it may be considered rude to doodle during classes at school, or in a meeting at work, doodling can actually be incredibly beneficial.",
            "source": "https://www.thisiscalmer.com/blog/what-are-benefits-of-doodling",
        },
        "listing-data": {
            "meta-title": "Top Doodlers available for collaboration | Wondor",
            "meta-content": "Find Doodlers available for collaboration. Connect with fellow doodlers, share your whimsical creations, and let your imagination shine by working with others | Wondor",
        },
    },
    {
        "slug": "guitar-playing",
        "category": "Guitar Playing",
        "image": musicImage,
        "background-color": "#E2F0CB",
        "artist-title": "Guitar Players",
        "similar-categories": [],
        "wiki-data": {
            "url": "learn-about-guitar-playing-and-collaboration-opportunities",
            "meta-title": "Who are Guitarist and collaboration opportunities with guitarist | Wondor",
            "meta-content": "Discover Guitar Playing: The art of musical expression through strings. Learn chords, techniques, and unleash your musical talent today!",
            "paragraph": "A guitar musician is a person who creates, composes, and/or performs music played on the guitar. A guitar musician may perform by himself or he may join a music band to combine the sound of his instrument with those of other musicians. The guitarist may also accompany his guitar playing with singing, though not all guitarists will do so.",
            "source": "https://www.musicalexpert.org/what-is-a-guitar-musician.htm",
        },
        "listing-data": {
            "meta-title": "Top Guitarist available for collaboration | Wondor",
            "meta-content": "Find Guitarist available for collaboration. Connect with fellow guitarists, share your melodies, harmonize with the community and strum your way to greatness | Wondor",
        },
    },
    {
        "slug": "hand-lettering",
        "name": "Hand Lettering",
        "image": handLetteringbgImage,
        "background-color": "#FBF0C4",
        "artist-title": "Hand Letterers",
        "similar-categories": [
            {
                "name": "Calligraphy",
                "slug": "calligraphy"
            },
        ],
        "wiki-data": {
            "url": "learn-about-hand-lettering-and-collaboration-opportunities",
            "meta-title": "Lean about Hand Lettering and collaboration opportunities | Wondor",
            "meta-content": "Explore Hand Lettering: The art of creating beautiful, personalized letters by hand. Unlock your creativity and craft stunning designs now!",
            "paragraph": "Hand lettering is an art form that involves drawing letters by hand. Hand lettering allows artists to interpret letters in creative ways. The art of lettering varies depending on the style and the artist doing the lettering.",
            "source": "https://www.vectornator.io/blog/hand-lettering",
        },
        "listing-data": {
            "meta-title": "Top Hand Letterers available for collaboration | Wondor",
            "meta-content": "Find Hand Letterers available for collaboration. Master the art of hand lettering. Connect with skilled artists, showcase your elegant designs, and elevate your craft | Wondor",
        },
    },
    {
        "slug": "illustration",
        "name": "Illustration",
        "image": illustratorImage,
        "background-color": "#FFDAC1",
        "artist-title": "Illustrators",
        "similar-categories": [
            {
                "name": "Illustration",
                "slug": "illustration"
            },
        ],
        "wiki-data": {
            "url": "learn-about-illustration-and-collaboration-opportunities",
            "meta-title": "Lean about Illustration and collaboration opportunities with illustrators | Wondor",
            "meta-content": "Discover Illustration: The art of visual storytelling and creativity. Unleash your imagination and bring ideas to life through captivating art!",
            "paragraph": "An illustration is a visualization that is made by an artist. The goal of each illustration is to explain information. It can be a drawing, a photograph, a collage, etc. It doesn’t matter. As long as it keeps its purpose – to visually represent facts and details. Illustrators are trained professionals who can draw in a variety of media not limited to pen and pencil, but also, especially in today’s hyper-digital world, digital image-making",
            "source": "https://graphicmama.com/blog/what-is-illustration/",
        },
        "listing-data": {
            "meta-title": "Top Illustrators available for collaboration | Wondor",
            "meta-content": "Find Illustrators available for collaboration. Unleash your imagination as an illustrator. Connect with fellow artists, showcase your visual stories, and find endless inspiration | Wondor",
        },
    },
    {
        "slug": "journaling",
        "name": "Journaling",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Journalers",
        "similar-categories": [
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
        ],
        "wiki-data": {
            "url": "learn-about-journaling-and-collaboration-opportunities",
            "meta-title": "Lean about Journaling and collaboration opportunities with journalers | Wondor",
            "meta-content": "Explore Journaling: A journey of self-reflection, creativity, and personal growth. Start capturing your thoughts and memories in a journal today!",
            "paragraph": "Journaling is the act of expressing your deepest thoughts and feelings by putting words to your inner life and then putting these words on paper. Journaling is a mental, emotional and spiritual exercise that helps you build strong “emotional muscles” to deal with life’s difficulties and uncertainties.",
            "source": "https://www.thecoach.zone/journaling-what-is-it-and-how-to-do-it/",
        },
        "listing-data": {
            "meta-title": "Top Journalers available for collaboration | Wondor",
            "meta-content": "Find Journalers available for collaboration. Connect with like-minded journalers, express, and document your journey | Wondor",
        },
    },
    {
        "slug": "musician",
        "name": "Musician",
        "image": musicImage,
        "background-color": "#E2F0CB",
        "artist-title": "Musicians",
        "similar-categories": [],
        "wiki-data": {
            "url": "learn-about-musicians-and-collaboration-opportunities",
            "meta-title": "Who are Musicians and collaboration opportunities with musicians | Wondor",
            "meta-content": "Discover Music Making: Unleash your musical talent and creativity. Learn to compose, produce, and share your melodies with the world!",
            "paragraph": "A musician is a person who composes and/or performs music, usually as an occupation but often as a hobby. He or she may play a musical instrument or several musical instruments, or he or she may be a vocalist instead.",
            "source": "https://www.musicalexpert.org/what-is-a-musician.htm",
        },
        "listing-data": {
            "meta-title": "Top Musicians available for collaboration | Wondor",
            "meta-content": "Find Musicians available for collaboration. Join fellow musicians in a harmonious space. Connect, collaborate, and share your melodies dedicated to passionate music makers | Wondor",
        },
    },
    {
        "slug": "painting",
        "name": "Painting",
        "image": paintingImage,
        "background-color": "#C7CEEA",
        "artist-title": "Painters",
        "similar-categories": [
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
            },
            {
                "name": "Caricaturing",
                "slug": "caricaturing",
            }
        ],
        "wiki-data": {
            "url": "learn-about-painting-and-collaboration-opportunities",
            "meta-title": "Lean about Painting and collaboration opportunities with painters | Wondor",
            "meta-content": "Explore Painting: The art of expression through colors and brushstrokes. Unleash your creativity and create captivating masterpieces today!",
            "paragraph": "Painting is the act or process of using paint. The paint can create an artwork known as a painting, or it can be used more practically as a protective coating or form of decoration. Paintings are a form of visual art that captures the expression of ideas and emotions on a two-dimensional surface.",
            "source": "https://www.eden-gallery.com/news/what-is-painting",
        },
        "listing-data": {
            "meta-title": "Top Painters available for collaboration | Wondor",
            "meta-content": "Find Painters available for collaboration. Immerse yourself in the world of painting. Connect with fellow artists, exhibit your masterpieces, and embrace the colors | Wondor",
        },
    },
    {
        "slug": "photography",
        "name": "Photography",
        "image": cameramanImage,
        "background-color": "#FFDAC1",
        "artist-title": "Photographers",
        "similar-categories": [
            {
                "name": "Illustration",
                "slug": "illustration"
            },
        ],
        "wiki-data": {
            "url": "learn-about-photography-and-collaboration-opportunities",
            "meta-title": "Lean about Photography and collaboration opportunities with phorographers | Wondor",
            "meta-content": "Discover Photography: The art of capturing moments and expressing stories through the lens. Unleash your creativity and master the art of visuals!",
            "paragraph": "Photography is the art of capturing light with a camera, usually via a digital sensor or film, to create an image. With the right camera equipment, you can even photograph wavelengths of light invisible to the human eye, including UV, infrared, and radio. There are many different types of photography, such as landscape, macro, wildlife, portrait, documentary, fashion, travel and event photography.",
            "source": "https://photographylife.com/what-is-photography"
        },
        "listing-data": {
            "meta-title": "Top Photographers available for collaboration | Wondor",
            "meta-content": "Find Photographers available for collaboration. Capture moments, share stories. Connect with photographers, showcase your artistry, and explore the world through lenses | Wondor",
        },
    },
    {
        "slug": "poetry",
        "name": "Poetry",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Poets",
        "similar-categories": [
            {
                "name": "Writing",
                "slug": "writing"
            },
            {
                "name": "Creative Writing",
                "slug": "creative-writing"
            },
            {
                "name": "Spoken Words",
                "slug": "spoken-words"
            },
            {
                "name": "Calligraphy",
                "slug": "calligraphy"
            }
        ],
        "wiki-data": {
            "url": "learn-about-poetry-and-collaboration-opportunities",
            "meta-title": "Lean about Poetry and collaboration opportunities with poets | Wondor",
            "meta-content": "Explore Poetry: The art of words and emotions woven into beautiful verses. Unleash your creativity and express your soul through poetic artistry!",
            "paragraph": "Poetry is a literary art form that can be written, spoken, or performed. It focuses on the aesthetics of language. It is usually composed in verse and is concerned with evoking an image or emotion. Poetry makes liberal use of literary devices, such as alliteration and metaphor. It is the musicality of language, the rendering of abstract thoughts, ideas, and emotions, rendered with words and sounds. It is pictures painted with words.",
            "source": "https://www.writingforward.com/poetry-writing/what-is-poetry"
        },
        "listing-data": {
            "meta-title": "Top Poets available for collaboration | Wondor",
            "meta-content": "Find Poets available for collaboration. Connect with fellow poets, story writers, share your emotions, compose verses that touch hearts and let your words paint vivid emotions | Wondor",
        },
    },
    {
        "slug": "scrapbooking",
        "name": "Scrapbooking",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Scrapbookers",
        "similar-categories": [
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
                "name": "Collage Making",
                "slug": "collage-making"
            },
            {
                "name": "Journaling",
                "slug": "journaling"
            }
        ],
        "wiki-data": {
            "url": "learn-about-scrapbooking-and-collaboration-opportunities",
            "meta-title": "Lean about Scrapbooking and collaboration opportunities with scrapbookers | Wondor",
            "meta-content": "Discover Scrapbooking: Preserve cherished memories and unleash your creativity through beautiful collages. Start crafting your keepsakes now!",
            "paragraph": "Scrapbooking, a crafting and documenting activity, involves taking books with blank pages and adding photos, memorabilia, journaling, and embellishments. Also known as cropping, the primary purpose of scrapbooking is to preserve memories for future generations, but a secondary purpose often is to exercise your creativity as you display your memories in a scrapbook.",
            "source": "https://www.thesprucecrafts.com/what-is-scrapbooking-2960505",
        },
        "listing-data": {
            "meta-title": "Top Scrapbookers available for collaboration | Wondor",
            "meta-content": "Find Scrapbookers available for collaboration. Preserve memories with scrapbooking. Connect with enthusiasts, showcase your creative layouts, and cherish life's moments | Wondor",
        },
    },
    {
        "slug": "singing",
        "name": "Singing",
        "image": singingImage,
        "background-color": "#FADAC1",
        "artist-title": "Singers",
        "similar-categories": [
            {
                "name": "Standup Comedy",
                "slug": "standup-comedy"
            }
        ],
        "wiki-data": {
            "url": "learn-about-singing-and-collaboration-opportunities",
            "meta-title": "Lean about Singing and collaboration opportunities with singers | Wondor",
            "meta-content": "Explore Singing: The art of melodic expression and soulful storytelling through vocals. Unleash your voice and embrace the joy of singing!",
            "paragraph": "Singing is the act of vocalizing melodies and is an attempt to create a blend of pitch, timbre, and rhythm. It is an expression of emotion and communication through musical sounds that are often sung in a variety of musical genres, including musical theatre, opera, popular music, classical music, jazz and folk music.",
            "source": "https://www.quora.com/What-is-the-definition-of-singing",
        },
        "listing-data": {
            "meta-title": "Top Singers available for collaboration | Wondor",
            "meta-content": "Find Singers available for collaboration Elevate your voice through singing. Connect with vocalists, share your melodies, and let the music resonate for passionate singers | Wondor",
        },
    },
    {
        "slug": "sketching",
        "name": "Sketching",
        "image": sketchingImage,
        "background-color": "#FADAC1",
        "artist-title": "Sketchers",
        "similar-categories": [
            {
                "name": "Painting",
                "slug": "painting"
            },
            {
                "name": "Caricature Drawing",
                "slug": "caricature-drawing"
            },
            {
                "name": "Doodling",
                "slug": "doodling"
            },
            {
                "name": "Caricaturing",
                "slug": "caricaturing",
            }
        ],
        "wiki-data": {
            "url": "learn-about-sketching-and-collaboration-opportunities",
            "meta-title": "Lean about Sketching and collaboration opportunities with skecthers | Wondor",
            "meta-content": "Discover Sketching: The art of capturing ideas and bringing imagination to life through lines and shapes. Unleash your creativity with sketches!",
            "paragraph": "It is about making a quick drawing, a study, which helps you to represent a design idea. It typically use quick marks and simple lines to capture only the essential elements of the subject matter. A sketch will usually lack many of the details that a finished drawing would have. ",
            "source": "https://www.eden-gallery.com/news/drawing-vs-sketching",
        },
        "listing-data": {
            "meta-title": "Top Sketchers available for collaboration | Wondor",
            "meta-content": "Find Sketchers available for collaboration. Connect with sketchers, share your sketches, and explore endless possibilities for passionate sketchers. Collaborate with sketchers | Wondor",
        },
    },
    {
        "slug": "spoken-words",
        "name": "Spoken Words",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Poets",
        "similar-categories": [
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
                "name": "Calligraphy",
                "slug": "calligraphy"
            }
        ],
        "wiki-data": {
            "url": "learn-about-spoken-words-and-collaboration-opportunities",
            "meta-title": "Lean about Spoken Word Portey and collaboration opportunities with poets | Wondor",
            "meta-content": "Explore Spoken Word Poetry: The captivating blend of words, rhythm, and emotion. Unleash your voice and share powerful stories through spoken art!",
            "paragraph": "Spoken word poetry is a word-based performance art where speakers engage in powerful self-expression by sharing their views on particular topics for a live audience, focusing on sound and presentation. Spoken word performances require memorization, performative body language (like gestures and facial expressions), enunciation, and eye contact with viewers.",
            "source": "https://www.masterclass.com/articles/how-to-write-spoken-word-poetry"
        },
        "listing-data": {
            "meta-title": "Top Spoken Words artists available for collaboration | Wondor",
            "meta-content": "Find Spoken Words artists available for collaboration. Connect with fellow poets, story writers, song writers, share your compelling performances, and ignite minds for spoken word artists. Embrace the power of spoken word | Wondor",
        },
    },
    {
        "slug": "standup-comedy",
        "name": "Standup Comedy",
        "image": singingImage,
        "background-color": "#FADAC1",
        "artist-title": "Standup Comedians",
        "similar-categories": [
            {
                "name": "Singing",
                "slug": "singing"
            },
        ],
        "wiki-data": {
            "url": "learn-about-standup-comedy-and-collaboration-opportunities",
            "meta-title": "Lean about Standup Comedy and collaboration opportunities with comedians | Wondor",
            "meta-content": "Discover Standup Comedy: The art of laughter and wit. Unleash your humor and entertain audiences with your comedic brilliance. Start performing now!",
            "paragraph": "Stand-up comedy is literally a comedian who tells funny stories through comedic performances by speaking directly to a live audience in an attempt to get that audience laughing.",
            "source": "https://cleancomedians.com/what-is-stand-up-comedy/",
        },
        "listing-data": {
            "meta-title": "Top Standup Comedians available for collaboration | Wondor",
            "meta-content": "Find Standup Comedians available for collaboration. Connect with comedians, share your humor, and bring joy to audiences for stand-up performers. Spread laughter with stand-up comedy. | Wondor",
        },
    },
    {
        "slug": "writing",
        "name": "Writing",
        "image": writerImage,
        "background-color": "#EDC5CD",
        "artist-title": "Writers",
        "similar-categories": [
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
        ],
        "wiki-data": {
            "url": "learn-about-writing-and-collaboration-opportunities",
            "meta-title": "Lean about Writing and collaboration opportunities with writers | Wondor",
            "meta-content": "Discover the essence of writing: its definition, importance, and influence on communication. Explore the art of expression through words. Connect with writers and Collaborate now!",
            "paragraph": "Writing is the act of expressing thoughts, ideas, and emotions through the use of written language. It is a fundamental form of communication that allows individuals to convey information, tell stories, express opinions, and explore the depths of human imagination. A skilled writer possesses the capacity to adapt their writing style to various audiences and purposes, whether it's persuasive, informative, or creative. They can organize thoughts coherently, develop engaging narratives, and employ persuasive techniques to captivate readers. Writing as a skill requires practice, attention to detail, and a willingness to continuously improve and refine one's written expression. ",
            "source": ""
        },
        "listing-data": {
            "meta-title": "Top Writers available for collaboration | Wondor",
            "meta-content": "Find Writers available for collaboration. Connect with fellow writers, poets, script writers, story tellers, song writters, explore creative ideas, and craft compelling stories | Wondor",
        },
    }
]