import React, { Component } from 'react';
import NewsItem from './NewsItem';
import SortNews, { sortChoose } from './SortNews';
import ItemsPagination, { paginate } from '../ItemsPagination';
import { dbNews } from '../../firebase';
import CreateNews from './CreateNews';
import './news-style.css';
import { Dimmer, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

export default class NewsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      news: {},
      loading: false,
      loaded: false,
      sortOrder: 'newest',
      activePage: 1,
      newsPerPage: 3,
      humbMenu: false,
    }
  }

  componentDidMount(){
    this.onUpdateNews();
  }

  onUpdateNews = () => {
    this.setState({loading: true})
    dbNews.onceGetNews()
      .then(snapshot => {
        this.setState(() => ({
          news: snapshot.val() || {},
          loading: false,
          loaded: true,
        }));
        console.log(snapshot.val())
      })

  }

  onDeleteNews = (key, item) => {
    dbNews.doDeleteNews(key, item).then(this.onUpdateNews);
    this.setState({
      activePage: 1
    });
  }

  isEmpty = obj => Object.keys(obj).length === 0

  updateSort = value => {
    this.setState({
      sortOrder: value
    })
  }

  toggleVisibility = () => this.setState({ humbMenu: !this.state.humbMenu })
  
  handleActivePage = activePage => {
    this.setState({
      activePage
    })
  }

  render(){
    const allNewsKeys = Object.keys(this.state.news);
    const sortedNewsKeys = sortChoose(allNewsKeys, this.state.sortOrder);
    const paginatedNewsKeys = paginate(sortedNewsKeys, this.state.activePage, this.state.newsPerPage);
    const renderNews = paginatedNewsKeys.map(key => {
      return (<NewsItem onDelete={this.onDeleteNews}
                        onUpdated={this.onUpdateNews}
                        event={this.state.news[key]} 
                        id={key}
                        key={key}/>)
    });
    
    return(
      <div className="news-wrapper">
        <Dimmer.Dimmable dimmed={this.state.loading} >
          { 
            this.isEmpty(this.state.news) && this.state.loaded ?
              <div className="ui container">
                <h2 className="no-news">
                  There are no news yet!
                </h2>
                <CreateNews onCreated={this.onUpdateNews} />
              </div>
              :
              <div className="ui container">
                <Sidebar.Pushable as={Segment}>
                  <Sidebar
                    as={Menu}
                    animation='uncover'
                    width='thin'
                    direction='right'
                    visible={this.state.humbMenu }
                    icon='labeled'
                    vertical
                    inverted
                  >
                    <Menu.Item name='home'>
                      <Icon name='home' />
                      Home
                    </Menu.Item>
                    <Menu.Item name='gamepad'>
                      <Icon name='gamepad' />
                      Games
                    </Menu.Item>
                    <Menu.Item name='camera'>
                      <Icon name='camera' />
                      Channels
                    </Menu.Item>
                  </Sidebar>
                  <Sidebar.Pusher>

                      <Header as='h3'>Application Content</Header>
                      <Image src='/assets/images/wireframe/paragraph.png' />

                  </Sidebar.Pusher>
                </Sidebar.Pushable>
                <div className="news-nav">
                  <CreateNews onCreated={this.onUpdateNews} />  
                  <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>        
                    <div className="sort-wrap">        
                      <span>
                        Sort by:
                        {' '}
                        <SortNews update={this.updateSort}/>
                      </span>
                    </div>
                </div>
                {renderNews}
                <ItemsPagination 
                  itemsPerPage={this.state.newsPerPage} 
                  itemsArray={sortedNewsKeys}
                  updActivePage={this.handleActivePage}
                />
              </div>
          }
        </Dimmer.Dimmable>
      </div>
    )
  }
}
// import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

// class SidebarRightUncover extends Component {
  // state = { visible: false }

  // toggleVisibility = () => this.setState({ visible: !this.state.visible })

//   render() {
//     const { visible } = this.state
//     return (
//       <div>
//         <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
//         <Sidebar.Pushable as={Segment}>
//           <Sidebar
//             as={Menu}
//             animation='uncover'
//             width='thin'
//             direction='right'
//             visible={visible}
//             icon='labeled'
//             vertical
//             inverted
//           >
//             <Menu.Item name='home'>
//               <Icon name='home' />
//               Home
//             </Menu.Item>
//             <Menu.Item name='gamepad'>
//               <Icon name='gamepad' />
//               Games
//             </Menu.Item>
//             <Menu.Item name='camera'>
//               <Icon name='camera' />
//               Channels
//             </Menu.Item>
//           </Sidebar>
//           <Sidebar.Pusher>
//             <Segment basic>
//               <Header as='h3'>Application Content</Header>
//               <Image src='/assets/images/wireframe/paragraph.png' />
//             </Segment>
//           </Sidebar.Pusher>
//         </Sidebar.Pushable>
//       </div>
//     )
//   }
// }