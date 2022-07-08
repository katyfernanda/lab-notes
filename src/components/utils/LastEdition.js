import { Accordion } from 'react-bootstrap';


 const LastEdition = (lastEdition, lastTitle) => {
    if ((lastEdition && lastTitle !==undefined)&&(lastEdition.length > 0 || lastTitle.length > 0)) {
      console.log(lastEdition, lastTitle)
      return (<Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <small className="text-muted">
              Contenido anterior
            </small>
          </Accordion.Header>
          <Accordion.Body>
            <small><strong><p>{lastTitle}</p></strong></small>
            <small><p>{lastEdition}</p></small>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      )
    }
  }

  export default LastEdition