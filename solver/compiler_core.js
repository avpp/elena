Parser = function() {
this.variables = [];
this.defineVariable = function(name){
if (this.variables.indexOf(name) == -1)
this.variables.push(name);
};

this.expressions = [];
this.clearAll = function() {
this.expressions = [];
this.variables = [];
}
this.addExpression = function(text){
this.expressions.push(text);
}

/*
    Default template driver for JS/CC generated parsers running as
    browser-based JavaScript/ECMAScript applications.
    
    WARNING:     This parser template will not run as console and has lesser
                features for debugging than the console derivates for the
                various JavaScript platforms.
    
    Features:
    - Parser trace messages
    - Integrated panic-mode error recovery
    
    Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
    
    This is in the public domain.
*/

var _dbg_withtrace        = false;
var _dbg_string            = new String();

function __dbg_print( text )
{
    _dbg_string += text + "\n";
}

function __lex( info )
{
    var state        = 0;
    var match        = -1;
    var match_pos    = 0;
    var start        = 0;
    var pos            = info.offset + 1;

    do
    {
        pos--;
        state = 0;
        match = -2;
        start = pos;

        if( info.src.length <= start )
            return 19;

        do
        {

switch( state )
{
    case 0:
        if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 13 || info.src.charCodeAt( pos ) == 32 ) state = 1;
        else if( info.src.charCodeAt( pos ) == 33 || info.src.charCodeAt( pos ) == 126 ) state = 2;
        else if( info.src.charCodeAt( pos ) == 38 ) state = 3;
        else if( info.src.charCodeAt( pos ) == 40 ) state = 4;
        else if( info.src.charCodeAt( pos ) == 41 ) state = 5;
        else if( info.src.charCodeAt( pos ) == 43 ) state = 6;
        else if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 49 ) ) state = 7;
        else if( info.src.charCodeAt( pos ) == 61 ) state = 8;
        else if( info.src.charCodeAt( pos ) == 62 ) state = 9;
        else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 10;
        else if( info.src.charCodeAt( pos ) == 47 ) state = 11;
        else if( info.src.charCodeAt( pos ) == 45 ) state = 12;
        else if( info.src.charCodeAt( pos ) == 42 ) state = 13;
        else if( info.src.charCodeAt( pos ) == 124 ) state = 14;
        else if( info.src.charCodeAt( pos ) == 92 ) state = 16;
        else state = -1;
        break;

    case 1:
        state = -1;
        match = 1;
        match_pos = pos;
        break;

    case 2:
        state = -1;
        match = 10;
        match_pos = pos;
        break;

    case 3:
        if( info.src.charCodeAt( pos ) == 38 ) state = 13;
        else state = -1;
        match = 9;
        match_pos = pos;
        break;

    case 4:
        state = -1;
        match = 2;
        match_pos = pos;
        break;

    case 5:
        state = -1;
        match = 3;
        match_pos = pos;
        break;

    case 6:
        state = -1;
        match = 8;
        match_pos = pos;
        break;

    case 7:
        state = -1;
        match = 4;
        match_pos = pos;
        break;

    case 8:
        if( info.src.charCodeAt( pos ) == 62 ) state = 9;
        else if( info.src.charCodeAt( pos ) == 61 ) state = 15;
        else state = -1;
        match = 6;
        match_pos = pos;
        break;

    case 9:
        state = -1;
        match = 7;
        match_pos = pos;
        break;

    case 10:
        if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 10;
        else state = -1;
        match = 5;
        match_pos = pos;
        break;

    case 11:
        if( info.src.charCodeAt( pos ) == 92 ) state = 13;
        else state = -1;
        break;

    case 12:
        if( info.src.charCodeAt( pos ) == 62 ) state = 9;
        else state = -1;
        match = 10;
        match_pos = pos;
        break;

    case 13:
        state = -1;
        match = 9;
        match_pos = pos;
        break;

    case 14:
        if( info.src.charCodeAt( pos ) == 124 ) state = 6;
        else state = -1;
        match = 8;
        match_pos = pos;
        break;

    case 15:
        state = -1;
        match = 6;
        match_pos = pos;
        break;

    case 16:
        if( info.src.charCodeAt( pos ) == 47 ) state = 6;
        else state = -1;
        break;

}


            pos++;

        }
        while( state > -1 );

    }
    while( 1 > -1 && match == 1 );

    if( match > -1 )
    {
        info.att = info.src.substr( start, match_pos - start );
        info.offset = match_pos;
        
switch( match )
{
    case 5:
        {
         this.defineVariable(info.att)
        }
        break;

}


    }
    else
    {
        info.att = new String();
        match = -1;
    }

    return match;
}


function __parse( src, err_off, err_la )
{
    var        sstack            = new Array();
    var        vstack            = new Array();
    var     err_cnt            = 0;
    var        act;
    var        go;
    var        la;
    var        rval;
    var     parseinfo        = new Function( "", "var offset; var src; var att;" );
    var        info            = new parseinfo();
    
/* Pop-Table */
var pop_tab = new Array(
    new Array( 0/* p' */, 1 ),
    new Array( 12/* p */, 1 ),
    new Array( 11/* equalEx */, 3 ),
    new Array( 11/* equalEx */, 1 ),
    new Array( 13/* conseqEx */, 3 ),
    new Array( 13/* conseqEx */, 1 ),
    new Array( 14/* orEx */, 3 ),
    new Array( 14/* orEx */, 1 ),
    new Array( 15/* andEx */, 3 ),
    new Array( 15/* andEx */, 1 ),
    new Array( 16/* negEx */, 2 ),
    new Array( 16/* negEx */, 1 ),
    new Array( 17/* var_constEx */, 1 ),
    new Array( 17/* var_constEx */, 1 ),
    new Array( 18/* valueEx */, 3 ),
    new Array( 18/* valueEx */, 1 )
);

/* Action-Table */
var act_tab = new Array(
    /* State 0 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 1 */ new Array( 19/* "$" */,0 ),
    /* State 2 */ new Array( 6/* "EqualStat" */,13 , 19/* "$" */,-1 ),
    /* State 3 */ new Array( 7/* "ConseqStat" */,14 , 19/* "$" */,-3 , 6/* "EqualStat" */,-3 , 3/* ")" */,-3 ),
    /* State 4 */ new Array( 8/* "OrStat" */,15 , 19/* "$" */,-5 , 6/* "EqualStat" */,-5 , 7/* "ConseqStat" */,-5 , 3/* ")" */,-5 ),
    /* State 5 */ new Array( 9/* "AndStat" */,16 , 19/* "$" */,-7 , 6/* "EqualStat" */,-7 , 7/* "ConseqStat" */,-7 , 8/* "OrStat" */,-7 , 3/* ")" */,-7 ),
    /* State 6 */ new Array( 19/* "$" */,-9 , 6/* "EqualStat" */,-9 , 7/* "ConseqStat" */,-9 , 8/* "OrStat" */,-9 , 9/* "AndStat" */,-9 , 3/* ")" */,-9 ),
    /* State 7 */ new Array( 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 8 */ new Array( 19/* "$" */,-11 , 6/* "EqualStat" */,-11 , 7/* "ConseqStat" */,-11 , 8/* "OrStat" */,-11 , 9/* "AndStat" */,-11 , 3/* ")" */,-11 ),
    /* State 9 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 10 */ new Array( 19/* "$" */,-15 , 6/* "EqualStat" */,-15 , 7/* "ConseqStat" */,-15 , 8/* "OrStat" */,-15 , 9/* "AndStat" */,-15 , 3/* ")" */,-15 ),
    /* State 11 */ new Array( 19/* "$" */,-12 , 6/* "EqualStat" */,-12 , 7/* "ConseqStat" */,-12 , 8/* "OrStat" */,-12 , 9/* "AndStat" */,-12 , 3/* ")" */,-12 ),
    /* State 12 */ new Array( 19/* "$" */,-13 , 6/* "EqualStat" */,-13 , 7/* "ConseqStat" */,-13 , 8/* "OrStat" */,-13 , 9/* "AndStat" */,-13 , 3/* ")" */,-13 ),
    /* State 13 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 14 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 15 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 16 */ new Array( 10/* "NegStat" */,7 , 2/* "(" */,9 , 4/* "Constant" */,11 , 5/* "Identifier" */,12 ),
    /* State 17 */ new Array( 19/* "$" */,-10 , 6/* "EqualStat" */,-10 , 7/* "ConseqStat" */,-10 , 8/* "OrStat" */,-10 , 9/* "AndStat" */,-10 , 3/* ")" */,-10 ),
    /* State 18 */ new Array( 6/* "EqualStat" */,13 , 3/* ")" */,23 ),
    /* State 19 */ new Array( 7/* "ConseqStat" */,14 , 19/* "$" */,-2 , 6/* "EqualStat" */,-2 , 3/* ")" */,-2 ),
    /* State 20 */ new Array( 8/* "OrStat" */,15 , 19/* "$" */,-4 , 6/* "EqualStat" */,-4 , 7/* "ConseqStat" */,-4 , 3/* ")" */,-4 ),
    /* State 21 */ new Array( 9/* "AndStat" */,16 , 19/* "$" */,-6 , 6/* "EqualStat" */,-6 , 7/* "ConseqStat" */,-6 , 8/* "OrStat" */,-6 , 3/* ")" */,-6 ),
    /* State 22 */ new Array( 19/* "$" */,-8 , 6/* "EqualStat" */,-8 , 7/* "ConseqStat" */,-8 , 8/* "OrStat" */,-8 , 9/* "AndStat" */,-8 , 3/* ")" */,-8 ),
    /* State 23 */ new Array( 19/* "$" */,-14 , 6/* "EqualStat" */,-14 , 7/* "ConseqStat" */,-14 , 8/* "OrStat" */,-14 , 9/* "AndStat" */,-14 , 3/* ")" */,-14 )
);

/* Goto-Table */
var goto_tab = new Array(
    /* State 0 */ new Array( 12/* p */,1 , 11/* equalEx */,2 , 13/* conseqEx */,3 , 14/* orEx */,4 , 15/* andEx */,5 , 16/* negEx */,6 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 1 */ new Array( ),
    /* State 2 */ new Array( ),
    /* State 3 */ new Array( ),
    /* State 4 */ new Array( ),
    /* State 5 */ new Array( ),
    /* State 6 */ new Array( ),
    /* State 7 */ new Array( 17/* var_constEx */,17 ),
    /* State 8 */ new Array( ),
    /* State 9 */ new Array( 11/* equalEx */,18 , 13/* conseqEx */,3 , 14/* orEx */,4 , 15/* andEx */,5 , 16/* negEx */,6 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 10 */ new Array( ),
    /* State 11 */ new Array( ),
    /* State 12 */ new Array( ),
    /* State 13 */ new Array( 13/* conseqEx */,19 , 14/* orEx */,4 , 15/* andEx */,5 , 16/* negEx */,6 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 14 */ new Array( 14/* orEx */,20 , 15/* andEx */,5 , 16/* negEx */,6 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 15 */ new Array( 15/* andEx */,21 , 16/* negEx */,6 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 16 */ new Array( 16/* negEx */,22 , 18/* valueEx */,8 , 17/* var_constEx */,10 ),
    /* State 17 */ new Array( ),
    /* State 18 */ new Array( ),
    /* State 19 */ new Array( ),
    /* State 20 */ new Array( ),
    /* State 21 */ new Array( ),
    /* State 22 */ new Array( ),
    /* State 23 */ new Array( )
);



/* Symbol labels */
var labels = new Array(
    "p'" /* Non-terminal symbol */,
    "WHITESPACE" /* Terminal symbol */,
    "(" /* Terminal symbol */,
    ")" /* Terminal symbol */,
    "Constant" /* Terminal symbol */,
    "Identifier" /* Terminal symbol */,
    "EqualStat" /* Terminal symbol */,
    "ConseqStat" /* Terminal symbol */,
    "OrStat" /* Terminal symbol */,
    "AndStat" /* Terminal symbol */,
    "NegStat" /* Terminal symbol */,
    "equalEx" /* Non-terminal symbol */,
    "p" /* Non-terminal symbol */,
    "conseqEx" /* Non-terminal symbol */,
    "orEx" /* Non-terminal symbol */,
    "andEx" /* Non-terminal symbol */,
    "negEx" /* Non-terminal symbol */,
    "var_constEx" /* Non-terminal symbol */,
    "valueEx" /* Non-terminal symbol */,
    "$" /* Terminal symbol */
);


    
    info.offset = 0;
    info.src = src;
    info.att = new String();
    
    if( !err_off )
        err_off    = new Array();
    if( !err_la )
    err_la = new Array();
    
    sstack.push( 0 );
    vstack.push( 0 );
    
    la = __lex( info );

    while( true )
    {
        act = 25;
        for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
        {
            if( act_tab[sstack[sstack.length-1]][i] == la )
            {
                act = act_tab[sstack[sstack.length-1]][i+1];
                break;
            }
        }

        if( _dbg_withtrace && sstack.length > 0 )
        {
            __dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
                            "\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
                            "\tAction: " + act + "\n" +
                            "\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
                                    "..." : "" ) + "\"\n" +
                            "\tStack: " + sstack.join() + "\n" +
                            "\tValue stack: " + vstack.join() + "\n" );
        }
        
            
        //Panic-mode: Try recovery when parse-error occurs!
        if( act == 25 )
        {
            if( _dbg_withtrace )
                __dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
            
            err_cnt++;
            err_off.push( info.offset - info.att.length );            
            err_la.push( new Array() );
            for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
                err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
            
            //Remember the original stack!
            var rsstack = new Array();
            var rvstack = new Array();
            for( var i = 0; i < sstack.length; i++ )
            {
                rsstack[i] = sstack[i];
                rvstack[i] = vstack[i];
            }
            
            while( act == 25 && la != 19 )
            {
                if( _dbg_withtrace )
                    __dbg_print( "\tError recovery\n" +
                                    "Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
                                    "Action: " + act + "\n\n" );
                if( la == -1 )
                    info.offset++;
                    
                while( act == 25 && sstack.length > 0 )
                {
                    sstack.pop();
                    vstack.pop();
                    
                    if( sstack.length == 0 )
                        break;
                        
                    act = 25;
                    for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
                    {
                        if( act_tab[sstack[sstack.length-1]][i] == la )
                        {
                            act = act_tab[sstack[sstack.length-1]][i+1];
                            break;
                        }
                    }
                }
                
                if( act != 25 )
                    break;
                
                for( var i = 0; i < rsstack.length; i++ )
                {
                    sstack.push( rsstack[i] );
                    vstack.push( rvstack[i] );
                }
                
                la = __lex( info );
            }
            
            if( act == 25 )
            {
                if( _dbg_withtrace )
                    __dbg_print( "\tError recovery failed, terminating parse process..." );
                break;
            }


            if( _dbg_withtrace )
                __dbg_print( "\tError recovery succeeded, continuing" );
        }
        
        /*
        if( act == 25 )
            break;
        */
        
        
        //Shift
        if( act > 0 )
        {            
            if( _dbg_withtrace )
                __dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
        
            sstack.push( act );
            vstack.push( info.att );
            
            la = __lex( info );
            
            if( _dbg_withtrace )
                __dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
        }
        //Reduce
        else
        {        
            act *= -1;
            
            if( _dbg_withtrace )
                __dbg_print( "Reducing by producution: " + act );
            
            rval = void(0);
            
            if( _dbg_withtrace )
                __dbg_print( "\tPerforming semantic action..." );
            
switch( act )
{
    case 0:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 1:
    {
         this.addExpression(vstack[ vstack.length - 1 ])
    }
    break;
    case 2:
    {
         rval = "(" + vstack[ vstack.length - 3 ].toString() + "==" + vstack[ vstack.length - 1 ].toString() + ")"
    }
    break;
    case 3:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 4:
    {
         rval = "(!(" + vstack[ vstack.length - 3 ].toString() + ") || " + vstack[ vstack.length - 1 ].toString() + ")"
    }
    break;
    case 5:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 6:
    {
         rval = "(" + vstack[ vstack.length - 3 ].toString() + " || " + vstack[ vstack.length - 1 ].toString() + ")"
    }
    break;
    case 7:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 8:
    {
         rval = "(" + vstack[ vstack.length - 3 ].toString() + " && " + vstack[ vstack.length - 1 ].toString() + ")"
    }
    break;
    case 9:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 10:
    {
         rval = "(!(" + vstack[ vstack.length - 1 ].toString() + "))"
    }
    break;
    case 11:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 12:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 13:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
    case 14:
    {
         rval = "(" + vstack[ vstack.length - 2 ].toString() + ")"
    }
    break;
    case 15:
    {
        rval = vstack[ vstack.length - 1 ];
    }
    break;
}



            if( _dbg_withtrace )
                __dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
                
            for( var i = 0; i < pop_tab[act][1]; i++ )
            {
                sstack.pop();
                vstack.pop();
            }
                                    
            go = -1;
            for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
            {
                if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
                {
                    go = goto_tab[sstack[sstack.length-1]][i+1];
                    break;
                }
            }
            
            if( act == 0 )
                break;
                
            if( _dbg_withtrace )
                __dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
                
            sstack.push( go );
            vstack.push( rval );            
        }
        
        if( _dbg_withtrace )
        {        
            alert( _dbg_string );
            _dbg_string = new String();
        }
    }

    if( _dbg_withtrace )
    {
        __dbg_print( "\nParse complete." );
        alert( _dbg_string );
    }
    
    return err_cnt;
}




__lex = __lex.bind(this);
__parse = __parse.bind(this);
this.parseOne = function(str){
var error_offsets = new Array();
var error_lookaheads = new Array();
var error_count = 0;
if( ( error_count = __parse( str, error_offsets, error_lookaheads ) ) > 0 ) {
var errstr = new String();
for( var i = 0; i < error_count; i++ )
errstr += "Parse error in line " +
( str.substr( 0, error_offsets[i] ).match( /\n/g ) ? str.substr( 0, error_offsets[i] ).match( /\n/g ).length : 1 ) +
" near \"" + str.substr( error_offsets[i] ) + "\", expecting \"" + error_lookaheads[i].join() + "\"\n" ;
return( errstr );
}
return null;
};

this.error_text = "";
this.solve = function(text){
this.clearAll();
this.error_text = ""
expr = text.split(/[\r\n;]+/).filter(function(e){return e});;
if (expr.length > 0) {
var err = null;
for (var i = 0; i < expr.length; i++) {
if ((err = this.parseOne(expr[i])) !== null) {
this.error_text = "Error in line: \"" + expr[i] + "\"\n\n" + err;
return -1;
}
}
if (this.variables.length > 30) {
this.error_text = "Too many variables";
return -1;
}
this.variables = this.variables.sort(function(a, b){return b.length - a.length;});

var total_check_string = "(1==1)";
for (var i = 0; i < this.expressions.length; i++) {
total_check_string += "&&((" + this.expressions[i] + ") == (1==1))";
}
for (var i = 0; i < this.variables.length; i++) {
var re = new RegExp(this.variables[i], 'g');
var re_t = "(($>>" + i.toString() + ")&1)";
total_check_string = total_check_string.replace(re, re_t);
}
var func = new Function("", "var a = 0; for(var $ = 0; $ < " + (1 << this.variables.length).toString() + "; $++) { if (" + total_check_string + ") a++;} return a;");
return func();
} else {
this.error_text = "Emoty string!"
return -1;
}
}
};