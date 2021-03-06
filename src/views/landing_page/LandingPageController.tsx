import React, {ChangeEvent, useEffect, useState} from "react";
import {Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {Genre, MovieCollection, MovieCollectionWithDates, MovieService} from "../../services/the_movie_db/MovieService";
import {BigCarousel} from "./BigCarousel";
import {PageLoading} from "../shered/PageLoading";
import {SmallMovieCarousel} from "./SmallMovieCarousel";
import ScrollAnimation from "react-animate-on-scroll";
import {TvShowCollection, TvShowsService} from "../../services/the_movie_db/TvShowsService";
import {SmallTvShowCarousel} from "./SmallTvShowCarousel";
import {useQuery} from "@apollo/client";
import {
    AllFavoritesByUserResp,
    AllFavoritesByUserVars,
    GET_FAVORITES_BY_USERID
} from "../../services/apollo/queries/FavoriteQueries";
import {addFavoriteAction} from "../../config/redux/Favorites";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../config/redux/ReduxStore";

function LandingPageController() {
    const userId = useSelector((state: ReduxState) => state.userDetails.userId);
    const dispatch = useDispatch();
    const {data, loading} = useQuery<AllFavoritesByUserResp, AllFavoritesByUserVars>(GET_FAVORITES_BY_USERID, {variables: {id: userId}});
    useEffect(() => {
        if (!loading && data !== undefined) {
            data.allFavoritesByUser.forEach((e) => {
                dispatch(addFavoriteAction(e));
            })
        }
    }, [data, dispatch, loading]);
    //tab bar
    const [selectedTab, setSelectedTabMovies] = useState<number>(0);
    //genres
    const [genres, setGenres] = useState<Genre[]>();
    //movies
    const [topRatedMovies, setTopRatedMovies] = useState<MovieCollection>();
    const [upComingMovies, setUpComingMovies] = useState<MovieCollection>();
    const [popularMovies, setPopularMovies] = useState<MovieCollection>();
    const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieCollectionWithDates>();
    //tv shows
    const [topRatedTvShows, setTopRatedTvShows] = useState<TvShowCollection>();
    const [popularTvShows, setPopularTvShows] = useState<TvShowCollection>();
    const [onTheAirTvShows, setOnTheAirTvShows] = useState<TvShowCollection>();

    useEffect(() => {
        //genres
        MovieService.getGenres().then((e) => {
            setGenres(e.data.genres);
        })
        //movies
        MovieService.getTopRated(1).then((e) => {
            setTopRatedMovies(e.data);
        });
        MovieService.getUpComing(1).then((e) => {
            setUpComingMovies(e.data);
        });
        MovieService.getPopular(1).then((e) => {
            setPopularMovies(e.data)
        });
        MovieService.getNowPlaying(1).then((e) => {
            setNowPlayingMovies(e.data);
        });

        //Tv Shows
        TvShowsService.getTopRated(1).then((e) => {
            setTopRatedTvShows(e.data);
        });
        TvShowsService.getPopular(1).then((e) => {
            setPopularTvShows(e.data)
        });
        TvShowsService.getOnTheAir(1).then((e) => {
            setOnTheAirTvShows(e.data)
        });
    }, []);


    function handleChange(event: ChangeEvent<{}>, newValue: number) {
        setSelectedTabMovies(newValue)
    }

    return (
        <>
            <Grid container={true} justify="center">
                <Grid item={true} xs={12} md={12}>
                    <PageLoading
                        loading={topRatedMovies === undefined || upComingMovies === undefined || popularMovies === undefined}/>

                    {/*<Typography align={'center'} variant={'h3'} className={'mt-2'}>Top Rated</Typography>*/}
                    <BigCarousel movies={topRatedMovies?.results} genres={genres}/>
                    <Tabs value={selectedTab}
                          className={'mt-4 mb-5'}
                          onChange={handleChange}
                          centered={true}
                          aria-label="movies or tv shows">
                        <Tab style={{fontSize: '1.3em'}} label="Movies" className={'mr-5'}/>
                        <Tab style={{fontSize: '1.3em'}} label="TV Shows"/>
                    </Tabs>
                    {selectedTab === 0 &&
                    <>
                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Upcoming In Theatres</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallMovieCarousel movies={upComingMovies?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>Popular</Typography>
                        <ScrollAnimation animateIn={'fadeInRight'}>
                            <SmallMovieCarousel movies={popularMovies?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Now Playing In Theatres</Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallMovieCarousel movies={nowPlayingMovies?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>
                    </>}
                    {selectedTab === 1 &&
                    <>
                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Top Rated
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallTvShowCarousel tvShows={topRatedTvShows?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Popular
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInRight'}>
                            <SmallTvShowCarousel tvShows={popularTvShows?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>

                        <Typography align={'center'} variant={'h3'} className={'mt-2'}>
                            Currently On The Air
                        </Typography>
                        <ScrollAnimation animateIn={'fadeInLeft'}>
                            <SmallTvShowCarousel tvShows={onTheAirTvShows?.results} initialStateLoading={loading}/>
                        </ScrollAnimation>
                    </>}
                </Grid>
            </Grid>
        </>
    )
}

export {LandingPageController}
