import { useRouter } from "next/router";
export default function Movie( { movie } ) {
    const router = useRouter();
    if(router.isFallback){
        return <h1>Loading...</h1>
    }

    return <h1>{movie.title}</h1>;
}

export const getStaticPaths = async () => {
    const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=01bcb73836f3de5be343cfca3f63f9fe'
    );
    const movies = await response.json();
    const paths = movies.results.map((movie) => ({
        params: { id: `${movie.id}` },
    }));

    return { paths, fallback: true };
}

export const getStaticProps = async (context) => {
    const movieId = context.params.id;
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=01bcb73836f3de5be343cfca3f63f9fe`
    );
    const movie = await response.json();

    return {
        props: {
            movie
        }
    }
}