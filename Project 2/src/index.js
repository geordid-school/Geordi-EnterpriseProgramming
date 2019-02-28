
//JS
import 'bootstrap';
import '../src/scripts/navbar.js';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/app.css';

//FontAwesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCode, faHome, faFileAlt, faBullhorn} from "@fortawesome/free-solid-svg-icons";

library.add(faCode, faHome, faFileAlt, faBullhorn );
dom.watch();