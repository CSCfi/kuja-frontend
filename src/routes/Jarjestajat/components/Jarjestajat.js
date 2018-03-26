import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

import LuvatList from 'routes/Jarjestajat/components/LuvatList'
import { P, BackgroundImage} from "../../../modules/styles"
import { ContentContainer } from '../../../modules/elements'
import Loading from '../../../modules/Loading'

class Jarjestajat extends Component {
  componentWillMount() {
    this.props.fetchLuvat()
  }

  render() {
    const { fetched, isFetching, hasErrored, data } = this.props.luvat

    if (fetched) {
      return (
        <ContentContainer>
          <Helmet>
            <title>Oiva | Koulutuksen järjestäjät</title>
          </Helmet>
          <BackgroundImage />
          <BreadcrumbsItem to='/'>Etusivu</BreadcrumbsItem>
          <BreadcrumbsItem to='/jarjestajat'>Koulutuksen järjestäjät</BreadcrumbsItem>

          <h1>Koulutuksen järjestäjät</h1>
          <P>Voimassa olevat koulutuksen järjestämisluvat ({Object.keys(data).length} kpl)</P>
          <LuvatList luvat={data}/>
        </ContentContainer>
      )
    } else if (isFetching) {
        return <Loading />
    } else if (hasErrored) {
      return <div>Lupia ladattaessa tapahtui virhe</div>
    } else {
      return null
    }
  }
}

export default Jarjestajat
