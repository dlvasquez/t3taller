import socketIOClient from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

var moment = require('moment'); // require
moment().format();


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));





class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      data: {},
      events: [],
      sells: [],
      buys: [],
      indicadoresStock: {}

    };
  }

  // const App = ({ }) => {
  //   const [data, setData] = useState([]);

  // 1. listen for a cpu event and update the state


  componentWillMount() {
    this.initSocket()
    // this.useEffect()

  }

  // Connect to and initializes the socket.
  initSocket = () => {
    const socket = socketIOClient('wss://le-18262636.bitzonte.com', {
      path: '/stocks'
    });
    socket.on('connect', () => {
      console.log("Connected");
    })
    socket.emit('EXCHANGES')
    var merExchanges = []
    socket.on('EXCHANGES', event => {
      console.log(event);

      // Object.keys(event).map(i => merExchanges.push(i))

      Object.entries(event).map(([key, value]) => {
        merExchanges.push(value)
      })
      // console.log(merExchanges);
      this.setState({ 'EXCHANGES': merExchanges })
    })
    socket.emit('STOCKS');

    socket.on('STOCKS', event => {
      this.setState({ 'STOCKS': event })
      console.log(event);
      for (var i = 0; i < event.length; i++) {
        const nameEvent = event[i].ticker;
        this.setState({ nameEvent: {} })
      }
    })
    var id = 0;
    socket.on("UPDATE", newEvents => {

      var eventFormated = {
        'id': id++,
        'ticker': newEvents.ticker,
        'value': newEvents.value,
        'time': moment(newEvents.time).format('MMMM Do YYYY, h:mm:ss a')
      }

      this.setState(prevState => ({
        'events': [...prevState.events, eventFormated]
      }));
      // console.log(eventFormated);
    })

    var bid = 0;
    socket.on("BUY", newEvents => {

      var eventFormated = {
        'id': bid++,
        'ticker': newEvents.ticker,
        'volume': newEvents.volume,
        'time': moment(newEvents.time).format()
      }

      this.setState(prevState => ({
        'buys': [...prevState.buys, eventFormated]
      }));
      // console.log(eventFormated);
    })

    var sid = 0;
    socket.on("SELL", newEvents => {

      var eventFormated = {
        'id': sid++,
        'ticker': newEvents.ticker,
        'volume': newEvents.volume,
        'time': moment(newEvents.time).format()
      }

      this.setState(prevState => ({
        'sells': [...prevState.sells, eventFormated]
      }));
      // console.log(eventFormated);
    })

    this.setState({ socket }
    )

  }

  tablaStockInfo() {
    // const classes = useStyles()
    const mercados = this.state.STOCKS;
    if (mercados) {
      return (
        <Grid item xs={6}>
          <TableContainer style={{ width: '650px' }} component={Paper}>
            <Table style={{ width: '650px' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Stocks</TableCell>
                  <TableCell align="right">Nombre Compañia&nbsp;</TableCell>
                  <TableCell align="right">País&nbsp;</TableCell>
                  <TableCell align="right">Moneda&nbsp;</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {mercados.map((row) => (
                  <TableRow key={row.ticker}>
                    <TableCell component="th" scope="row">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="right">{row.company_name}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.quote_base}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )
    }
  }

  tablaMercadoInfo() {
    // const classes = useStyles()
    const mercados = this.state.EXCHANGES;
    if (mercados) {
      return (
        <Grid item xs={6}>
          <TableContainer style={{ width: '650px' }} component={Paper}>
            <Table style={{ width: '650px' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Mercados</TableCell>
                  <TableCell align="right">Exchange Ticker&nbsp;</TableCell>
                  <TableCell align="right">País&nbsp;</TableCell>
                  <TableCell align="right">Dirección&nbsp;</TableCell>
                  <TableCell align="right">Listado Compañías&nbsp;</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {mercados.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.exchange_ticker}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.listed_companies}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )
    }
  }





  tablaIndicesMercado(indicadoresMercado) {
    // const classes = useStyles();
    if (indicadoresMercado) {
      return (
        <Grid item xs={6}>
          <TableContainer style={{ width: '650px' }} component={Paper}>
            <Table style={{ width: '650px' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Mercados</TableCell>
                  <TableCell align="right">Volumen Compra&nbsp;($)</TableCell>
                  <TableCell align="right">Volumen Venta&nbsp;($)</TableCell>
                  <TableCell align="right">Volumen Total&nbsp;($)</TableCell>
                  <TableCell align="right">Cantidad Acciones&nbsp;</TableCell>
                  <TableCell align="right">Participación Mercado&nbsp;(%)</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {indicadoresMercado.map((row) => (
                  <TableRow key={row.nameCortoMercado}>
                    <TableCell component="th" scope="row">
                      {row.nameCortoMercado}
                    </TableCell>
                    <TableCell align="right">{row.volCompra}</TableCell>
                    <TableCell align="right">{row.volVenta}</TableCell>
                    <TableCell align="right">{row.volTotal}</TableCell>
                    <TableCell align="right">{row.cantidadAcciones}</TableCell>
                    <TableCell align="right">{row.partMercado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )
    }
  }












  tablaIndicesStock(indicadoresStock) {
    // const classes = useStyles();
    if (indicadoresStock) {
      return (
        <Grid item xs={6}>

          <TableContainer style={{ width: 650 }} component={Paper}>
            <Table style={{ width: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Stocks</TableCell>
                  <TableCell align="right">Volumen Total Transado</TableCell>
                  <TableCell align="right">Alto Histórico&nbsp;($)</TableCell>
                  <TableCell align="right">Bajo Histórico&nbsp;($)</TableCell>
                  <TableCell align="right">Último Precio&nbsp;($)</TableCell>
                  <TableCell align="right">Variación Porcentual&nbsp;(%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {indicadoresStock.map((row) => (
                  <TableRow key={row.nameStock}>
                    <TableCell component="th" scope="row">
                      {row.nameStock}
                    </TableCell>
                    <TableCell align="right">{row.totalTransado}</TableCell>
                    <TableCell align="right">{row.altoHistorico}</TableCell>
                    <TableCell align="right">{row.bajoHistorico}</TableCell>
                    <TableCell align="right">{row.ultimoPrecio}</TableCell>
                    <TableCell align="right">{row.varPorcentual}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      )
    }
  }


  mercadoIndices() {
    var indicadoresMercado = []
    var volCompra = 0;
    var volVenta = 0;
    var volTotal = 0;
    var cantidadAcciones = 0;
    var partMercado = 0;
    var nameMercado = null;
    var nameCortoMercado = null;
    var listaCompanias = []
    var listaStocks = [];
    var listaBuy = [];
    var listaSell = [];
    var listaNameStocks = [];
    var volTotalMercados = 0;
    // var listaPrices = [];

    if (this.state.EXCHANGES) {
      for (var i = 0; i < this.state.EXCHANGES.length; i++) {
        volCompra = 0;
        volVenta = 0;
        volTotal = 0;
        cantidadAcciones = 0;
        partMercado = 0;


        nameMercado = this.state.EXCHANGES[i].name;
        nameCortoMercado = this.state.EXCHANGES[i].exchange_ticker;



        listaCompanias = this.state.EXCHANGES[i].listed_companies;


        // console.log(listaCompanias);

        if (this.state.STOCKS) {
          listaStocks = this.state.STOCKS.filter(e => listaCompanias.includes(e.company_name));

          listaNameStocks = [];

          for (var st = 0; st < listaStocks.length; st++) {
            listaNameStocks.push(listaStocks[st].ticker)
          }


          listaBuy = this.state.buys.filter(e => listaNameStocks.includes(e.ticker));


          listaSell = this.state.buys.filter(e => listaNameStocks.includes(e.ticker));

          // console.log('A');
          if (listaBuy.length > 1) {
            for (var b = 0; b < listaBuy.length; b++) {
              volCompra += listaBuy[b].volume;
            }
          }
          if (listaSell.length > 1) {
            for (var s = 0; s < listaSell.length; s++) {
              volVenta += listaSell[s].volume;
            }
          }

          volTotal = volCompra + volVenta;
          volTotalMercados += volTotal;
          cantidadAcciones = listaNameStocks.length;


          // console.log({ nameMercado, volCompra, volVenta, volTotal, cantidadAcciones, partMercado })
        }


        indicadoresMercado.push({ nameCortoMercado, nameMercado, volCompra, volVenta, volTotal, cantidadAcciones, partMercado })
      }

      for (var m = 0; m < indicadoresMercado.length; m++) {
        indicadoresMercado[m].partMercado = Number(indicadoresMercado[m].volTotal / volTotalMercados * 100).toPrecision(4);
      }

    }
    // console.log(indicadoresMercado);
    return indicadoresMercado;
  }




  stockIndices() {
    var indicadoresStock = []
    var totalTransado = 0;
    var altoHistorico = 0;
    var bajoHistorico = 0;
    var ultimoPrecio = 0;
    var varPorcentual = 0;
    var nameStock = null;
    var listaBuy = [];
    var listaSell = [];
    var listaPrices = [];
    if (this.state.STOCKS) {
      for (var i = 0; i < this.state.STOCKS.length; i++) {
        totalTransado = 0;
        altoHistorico = 0;
        bajoHistorico = 0;
        ultimoPrecio = 0;
        varPorcentual = 0;

        nameStock = this.state.STOCKS[i].ticker;
        listaBuy = this.state.buys.filter(e => e.ticker === nameStock);
        listaSell = this.state.buys.filter(e => e.ticker === nameStock);
        listaPrices = this.state.events.filter(e => e.ticker === nameStock);

        for (var b = 0; b < listaBuy.length; b++) {
          totalTransado += listaBuy[b].volume;
        }
        for (var s = 0; b < listaSell.length; s++) {
          totalTransado += listaSell[s].volume;
        }
        if (listaPrices.length > 1) {
          altoHistorico = Math.max(...listaPrices.map(o => o.value), null);
          bajoHistorico = Math.min(...listaPrices.map(o => o.value), null);
          ultimoPrecio = listaPrices[listaPrices.length - 1].value;
          if (listaPrices.length > 2) {
            varPorcentual = Number((ultimoPrecio - listaPrices[listaPrices.length - 2].value) / listaPrices[listaPrices.length - 2].value * 100).toPrecision(2);
          }
        }
        indicadoresStock.push({ nameStock, totalTransado, altoHistorico, bajoHistorico, ultimoPrecio, varPorcentual })
      }
    }

    //console.log(indicadoresStock);
    return indicadoresStock;
  }


  render() {

    const items = [];
    var indicadoresStock = this.stockIndices();
    var indicadoresMercado = this.mercadoIndices();
    //const tablaStocks = this.tablaIndicesStock(indicadoresStock);
    if (this.state.STOCKS) {
      // console.log(this.state.STOCKS.length);
      for (var i = 0; i < this.state.STOCKS.length; i++) {
        // items.push(this.state.STOCKS[i].ticker);
        items.push(
          <Grid item xs={3}>
            <div>
              <h4>Precio {this.state.STOCKS[i].ticker} </h4>
              <LineChart key={i} width={300} height={250} data={this.state.events.filter(e =>
                e.ticker === this.state.STOCKS[i].ticker)}>
                <XAxis dataKey="time" />
                <YAxis />
                <Line dataKey="value" />
                <Tooltip></Tooltip>
                <Legend ></Legend>
              </LineChart>
            </div>
          </Grid>
        )
      }
    }



    return (
      <div>
        <h1>Tarea 3</h1>

        <Grid container spacing={10}>
          {/* <ul> */}
          {items}

          {/* </ul> */}
        </Grid>
        <Grid container spacing={10}>

          {this.tablaIndicesStock(indicadoresStock)}


          {this.tablaIndicesMercado(indicadoresMercado)}

          {this.tablaMercadoInfo()}

          {this.tablaStockInfo()}
        </Grid>
      </div>
    );
  };
}

export default App;