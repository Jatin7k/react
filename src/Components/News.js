import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News =(props)=> {
    
    const[articles, setArticles] =useState([])
    const[loading, setLoading] =useState(true)
    const[page, setPage] =useState(1 )
    const[totalResults, setTotalResults] =useState(0 )
    
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8631e1f6d03b40668c5f547d9bda776e&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    
    props.setProgress(100);
}
useEffect(()=>{
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)}-Daily Beast News`;
    // eslint-disable-next-line
  },[])
  
//   const handlePrevClick = async () => {
//    setPage(page - 1)
//     updateNews();

//   }
//   const handleNextClick = async () => {
   
//     setPage(page + 1)
//     updateNews();
//   }

  const fetchMoreData = async () => {
      // this.updateNews();
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8631e1f6d03b40668c5f547d9bda776e&page=${page +1} &pageSize=${props.pageSize}`;
      setPage(page + 1)
      let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
   
    
  };
  
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: '25px 0px', marginTop:'90px' }}>Daily Beast News -Top  {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading}
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}>


          <div className="container">

            <div className="row">
              {articles.map((element, index ) => {
                return <div className="col-md-4" key={index}>
                  <NewsItem title={element.title? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
       <button disabled={page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
       <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
       </div> */}
      </div >
    )
  
}

export default News

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}