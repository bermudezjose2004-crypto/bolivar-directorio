import { useState } from "react";

const DEPT_COLORS = {
      "Operaciones": { bg: "#E6F1FB", text: "#0C447C" },
      "Finanzas": { bg: "#E1F5EE", text: "#085041" },
      "Marketing": { bg: "#EEEDFE", text: "#3C3489" },
      "RRHH": { bg: "#FAEEDA", text: "#633806" },
      "Tecnologia": { bg: "#FAECE7", text: "#712B13" },
};

const ACTIVOS_OPCIONES = ["Laptop","Cargador laptop","Llave parqueo","Telefono","Tarjeta acceso","Monitor","Mouse","Teclado","Mochila"];

const ACTIVO_ICONS = {
      "Laptop":"ti-device-laptop","Cargador laptop":"ti-plug","Llave parqueo":"ti-key",
      "Telefono":"ti-device-mobile","Tarjeta acceso":"ti-id","Monitor":"ti-device-desktop",
      "Mouse":"ti-mouse","Teclado":"ti-keyboard","Mochila":"ti-briefcase",
};

const AVATAR_COLORS = ["#7F77DD","#1D9E75","#D85A30","#D4537E","#378ADD","#BA7517","#639922","#E24B4A"];

const INITIAL = [
    { id:1, nombre:"Valentina Rios", puesto:"Gerente General", depto:"Operaciones", email:"valentina.rios@bolivar.com", activo:true, activos:["Laptop","Cargador laptop","Llave parqueo","Tarjeta acceso"], devueltos:[] },
    { id:2, nombre:"Andres Molina", puesto:"Director de Finanzas", depto:"Finanzas", email:"andres.molina@bolivar.com", activo:true, activos:["Laptop","Cargador laptop","Monitor"], devueltos:[] },
    { id:3, nombre:"Camila Herrera", puesto:"Coordinadora de Marketing", depto:"Marketing", email:"camila.herrera@bolivar.com", activo:true, activos:["Laptop","Telefono","Tarjeta acceso"], devueltos:[] },
    { id:4, nombre:"Luis Paredes", puesto:"Desarrollador Senior", depto:"Tecnologia", email:"luis.paredes@bolivar.com", activo:true, activos:["Laptop","Cargador laptop","Monitor","Mouse","Teclado"], devueltos:[] },
    { id:5, nombre:"Sofia Guerrero", puesto:"Analista de RRHH", depto:"RRHH", email:"sofia.guerrero@bolivar.com", activo:true, activos:["Laptop","Cargador laptop"], devueltos:[] },
    { id:6, nombre:"Mateo Castillo", puesto:"Contador", depto:"Finanzas", email:"mateo.castillo@bolivar.com", activo:true, activos:["Laptop","Monitor","Llave parqueo"], devueltos:[] },
    { id:7, nombre:"Isabella Vega", puesto:"Disenadora UX", depto:"Tecnologia", email:"isabella.vega@bolivar.com", activo:true, activos:["Laptop","Cargador laptop","Mouse","Mochila"], devueltos:[] },
    { id:8, nombre:"Diego Ramirez", puesto:"Ejecutivo de Ventas", depto:"Operaciones", email:"diego.ramirez@bolivar.com", activo:true, activos:["Laptop","Telefono","Llave parqueo","Tarjeta acceso"], devueltos:[] },
    ];

function initials(n) { return n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase(); }

export default function App() {
      const [employees, setEmployees] = useState(INITIAL);
      const [confirm, setConfirm] = useState(null);
      const [notifStatus, setNotifStatus] = useState(null);
      const [showAdd, setShowAdd] = useState(false);
      const [expanded, setExpanded] = useState(null);
      const [editActivos, setEditActivos] = useState(null);
      const [newEmp, setNewEmp] = useState({nombre:"",puesto:"",depto:"Operaciones",email:"",activos:[],devueltos:[]});
      const [filterDepto, setFilterDepto] = useState("Todos");

  const activos = employees.filter(e=>e.activo);
      const inactivos = employees.filter(e=>!e.activo);
      const filtered = filterDepto==="Todos" ? activos : activos.filter(e=>e.depto===filterDepto);
      const deptos = ["Todos",...Object.keys(DEPT_COLORS)];

  function toggleDevuelto(empId, item) {
          setEmployees(prev=>prev.map(e=>{
                    if(e.id!==empId) return e;
                    const ya = e.devueltos.includes(item);
                    return {...e, devueltos: ya ? e.devueltos.filter(d=>d!==item) : [...e.devueltos, item]};
          }));
  }

  function toggleActivo(empId, item) {
          setEmployees(prev=>prev.map(e=>{
                    if(e.id!==empId) return e;
                    const has = e.activos.includes(item);
                    return {...e, activos: has ? e.activos.filter(a=>a!==item) : [...e.activos,item], devueltos: e.devueltos.filter(d=>d!==item)};
          }));
  }

  function handleDeparture(emp) {
          setEmployees(prev=>prev.map(e=>e.id===emp.id?{...e,activo:false}:e));
          setConfirm(null); setExpanded(null);
          setNotifStatus({name:emp.nombre});
  }

  function addEmployee() {
          if(!newEmp.nombre||!newEmp.puesto||!newEmp.email) return;
          setEmployees(prev=>[...prev,{...newEmp,id:Date.now(),activo:true,devueltos:[]}]);
          setNewEmp({nombre:"",puesto:"",depto:"Operaciones",email:"",activos:[],devueltos:[]});
          setShowAdd(false);
  }

  return (
          <div style={{padding:"1.5rem",fontFamily:"sans-serif",background:"white",minHeight:"100vh"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem"}}>
                                <div>
                                          <div style={{fontSize:18,fontWeight:500,color:"#2C2C2A"}}>Bolivar directorio</div>div>
                                          <div style={{fontSize:13,color:"#666",marginTop:2}}>{activos.length} empleados activos</div>div>
                                </div>div>
                            <button onClick={()=>setShowAdd(true)} style={{fontSize:14,padding:"7px 14px"}}>+ Agregar</button>button>
                    </div>div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:"1.25rem"}}>
                    {[["Activos",activos.length],["Salidas",inactivos.length],["Departamentos",Object.keys(DEPT_COLORS).length]].map(([l,v])=>(
                        <div key={l} style={{background:"rgba(240,240,240,0.97)",borderRadius:8,padding:"0.75rem 1rem"}}>
                                    <div style={{fontSize:12,color:"#666",marginBottom:4}}>{l}</div>div>
                                    <div style={{fontSize:22,fontWeight:500,color:"#2C2C2A"}}>{v}</div>div>
                        </div>div>
                      ))}
                </div>div>
              {notifStatus && (
                      <div style={{background:"#d1fae5",border:"1px solid #6ee7b7",borderRadius:8,padding:"0.75rem 1rem",marginBottom:"1rem",fontSize:14,color:"#065f46",display:"flex",justifyContent:"space-between"}}>
                                <span>Salida de {notifStatus.name} registrada.</span>span>
                                <button onClick={()=>setNotifStatus(null)}>Cerrar</button>button>
                      </div>div>
                )}
                <div style={{display:"flex",gap:8,marginBottom:"1rem",flexWrap:"wrap"}}>
                    {deptos.map(d=>(
                        <button key={d} onClick={()=>setFilterDepto(d)} style={{fontSize:13,padding:"5px 12px",background:filterDepto===d?"#eee":"transparent"}}>{d}</button>button>
                      ))}
                </div>div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {filtered.map(emp=>{
                        const dc = DEPT_COLORS[emp.depto]||{bg:"#F1EFE8",text:"#444441"};
                        const avatarColor = AVATAR_COLORS[emp.id%AVATAR_COLORS.length];
                        const isOpen = expanded===emp.id;
                        const isEditing = editActivos===emp.id;
                        const devueltos = emp.devueltos||[];
                        const pendientes = emp.activos.filter(a=>!devueltos.includes(a));
                        return (
                                        <div key={emp.id} style={{background:"white",border:"1px solid #ddd",borderRadius:12,overflow:"hidden"}}>
                                                      <div style={{padding:"0.85rem 1rem",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setExpanded(isOpen?null:emp.id)}>
                                                                      <div style={{width:40,height:40,borderRadius:"50%",background:avatarColor+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:500,color:avatarColor,flexShrink:0}}>{initials(emp.nombre)}</div>div>
                                                                      <div style={{flex:1,minWidth:0}}>
                                                                                        <div style={{fontWeight:500,fontSize:14,color:"#2C2C2A"}}>{emp.nombre}</div>div>
                                                                                        <div style={{fontSize:12,color:"#666",marginTop:1}}>{emp.puesto}</div>div>
                                                                      </div>div>
                                                                      <span style={{fontSize:12,padding:"3px 10px",borderRadius:6,background:dc.bg,color:dc.text,flexShrink:0}}>{emp.depto}</span>span>
                                                          {emp.activos.length>0 && <span style={{fontSize:12,padding:"3px 8px",borderRadius:6,background:pendientes.length===0?"#E1F5EE":"#FAEEDA",color:pendientes.length===0?"#085041":"#633806",flexShrink:0}}>{devueltos.length}/{emp.activos.length}</span>span>}
                                                                      <span style={{fontSize:16,color:"#666",flexShrink:0}}>{isOpen?"v":">"}</span>span>
                                                      </div>div>
                                            {isOpen && (
                                                            <div style={{borderTop:"1px solid #ddd",padding:"0.75rem 1rem",background:"#fafafa"}}>
                                                                              <div style={{fontSize:12,marginBottom:8,display:"flex",justifyContent:"space-between"}}>
                                                                                                  <span style={{fontWeight:500}}>Activos asignados</span>span>
                                                                                                  <button onClick={(e)=>{e.stopPropagation();setEditActivos(isEditing?null:emp.id);}} style={{fontSize:12,padding:"3px 10px"}}>{isEditing?"Listo":"Editar lista"}</button>button>
                                                                              </div>div>
                                                                {isEditing ? (
                                                                                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:"0.75rem"}}>
                                                                                        {ACTIVOS_OPCIONES.map(item=>{
                                                                                                                const tiene = emp.activos.includes(item);
                                                                                                                return <button key={item} onClick={(e)=>{e.stopPropagation();toggleActivo(emp.id,item);}} style={{fontSize:12,padding:"4px 10px",background:tiene?"#F97316":"transparent",borderColor:tiene?"#F97316":"#ccc",color:tiene?"#fff":"#555"}}>{item}</button>button>;
                                                                                        })}
                                                                                        </div>div>
                                                                                  ) : (
                                                                                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:"0.75rem"}}>
                                                                                        {emp.activos.length===0 ? <span style={{fontSize:13,color:"#999"}}>Sin activos asignados</span>span> : emp.activos.map(item=>{
                                                                                                                    const devuelto = devueltos.includes(item);
                                                                                                            return (
                                                                                                              <div key={item} onClick={(e)=>{e.stopPropagation();toggleDevuelto(emp.id,item);}} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",borderRadius:8,background:devuelto?"#E1F5EE":"white",border:"1px solid "+(devuelto?"#9FE1CB":"#ddd"),cursor:"pointer"}}>
                                                                                                                                          <div style={{width:20,height:20,borderRadius:4,border:"1.5px solid "+(devuelto?"#1D9E75":"#ccc"),background:devuelto?"#1D9E75":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{devuelto && <span style={{fontSize:12,color:"white"}}>ok</span>span>}</div>div>
                                                                                                                                          <span style={{fontSize:13,color:devuelto?"#085041":"#333",textDecoration:devuelto?"line-through":"none",flex:1}}>{item}</span>span>
                                                                                                                                          <span style={{fontSize:11,color:devuelto?"#1D9E75":"#aaa"}}>{devuelto?"Devuelto":"Pendiente"}</span>span>
                                                                                                                  </div>div>
                                                                                                            );
                                                                                        })}
                                                                                        </div>div>
                                                                              )}
                                                                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:8,borderTop:"1px solid #ddd"}}>
                                                                                                  <span style={{fontSize:12,color:"#888"}}>{emp.email}</span>span>
                                                                                                  <button onClick={(e)=>{e.stopPropagation();setConfirm(emp);}} style={{fontSize:13,padding:"5px 12px",color:"#E24B4A",borderColor:"#E24B4A"}}>Registrar salida</button>button>
                                                                              </div>div>
                                                            </div>div>
                                                      )}
                                        </div>div>
                                      );
          })}
                </div>div>
              {inactivos.length>0 && (
                      <div style={{marginTop:"1.5rem"}}>
                                <div style={{fontSize:13,fontWeight:500,color:"#666",marginBottom:8}}>Salidas registradas</div>div>
                                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                                    {inactivos.map(emp=>{
                                        const devueltos = emp.devueltos||[];
                                        const pendientes = emp.activos.filter(a=>!devueltos.includes(a));
                                        return (
                                                            <div key={emp.id} style={{border:"1px solid #ddd",borderRadius:8,padding:"0.7rem 1rem",background:"white",opacity:0.7}}>
                                                                              <div style={{display:"flex",alignItems:"center",gap:10}}>
                                                                                                  <span style={{fontSize:14,color:"#555",flex:1}}>{emp.nombre}</span>span>
                                                                                                  <span style={{fontSize:12,color:"#aaa"}}>{emp.puesto} - {emp.depto}</span>span>
                                                                                  {emp.activos.length>0 && <span style={{fontSize:12,padding:"2px 8px",borderRadius:6,background:pendientes.length===0?"#E1F5EE":"#FAEEDA",color:pendientes.length===0?"#085041":"#633806"}}>{devueltos.length}/{emp.activos.length} devueltos</span>span>}
                                                                              </div>div>
                                                            </div>div>
                                                          );
                      })}
                                </div>div>
                      </div>div>
                )}
              {confirm && (
                      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
                                <div style={{background:"white",borderRadius:12,border:"1px solid #ddd",padding:"1.25rem",width:310}}>
                                            <div style={{fontSize:16,fontWeight:500,marginBottom:8}}>Confirmar salida</div>div>
                                            <div style={{fontSize:14,color:"#555",marginBottom:"0.75rem"}}>Registrar la salida de <strong>{confirm.nombre}</strong>strong>?</div>div>
                                            <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
                                                          <button onClick={()=>setConfirm(null)} style={{fontSize:13,padding:"7px 14px"}}>Cancelar</button>button>
                                                          <button onClick={()=>handleDeparture(confirm)} style={{fontSize:13,padding:"7px 14px",background:"#E24B4A",borderColor:"#E24B4A",color:"#fff"}}>Confirmar</button>button>
                                            </div>div>
                                </div>div>
                      </div>div>
                )}
              {showAdd && (
                      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
                                <div style={{background:"white",borderRadius:12,border:"1px solid #ddd",padding:"1.25rem",width:310}}>
                                            <div style={{fontSize:16,fontWeight:500,marginBottom:"1rem"}}>Nuevo empleado</div>div>
                                    {[["Nombre completo","nombre","text"],["Puesto","puesto","text"],["Correo","email","email"]].map(([label,key,type])=>(
                                        <div key={key} style={{marginBottom:10}}>
                                                        <div style={{fontSize:12,color:"#666",marginBottom:4}}>{label}</div>div>
                                                        <input type={type} value={newEmp[key]} onChange={e=>setNewEmp(p=>({...p,[key]:e.target.value}))} style={{width:"100%"}}/>
                                        </div>div>
                                      ))}
                                            <div style={{marginBottom:10}}>
                                                          <div style={{fontSize:12,color:"#666",marginBottom:4}}>Departamento</div>div>
                                                          <select value={newEmp.depto} onChange={e=>setNewEmp(p=>({...p,depto:e.target.value}))} style={{width:"100%"}}>
                                                              {Object.keys(DEPT_COLORS).map(d=><option key={d}>{d}</option>option>)}
                                                          </select>select>
                                            </div>div>
                                            <div style={{marginBottom:"1rem"}}>
                                                          <div style={{fontSize:12,color:"#666",marginBottom:6}}>Activos asignados</div>div>
                                                          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                                                              {ACTIVOS_OPCIONES.map(item=>{
                                            const sel = newEmp.activos.includes(item);
                                            return <button key={item} onClick={()=>setNewEmp(p=>({...p,activos:sel?p.activos.filter(a=>a!==item):[...p.activos,item]}))} style={{fontSize:12,padding:"4px 10px",background:sel?"#F97316":"transparent",borderColor:sel?"#F97316":"#ccc",color:sel?"#fff":"#555"}}>{item}</button>button>;
                      })}
                                                          </div>div>
                                            </div>div>
                                            <div style={{display:"flex",justifyContent:"flex-end",gap:8}}>
                                                          <button onClick={()=>setShowAdd(false)} style={{fontSize:13,padding:"7px 14px"}}>Cancelar</button>button>
                                                          <button onClick={addEmployee} style={{fontSize:13,padding:"7px 14px",background:"#7F77DD",borderColor:"#7F77DD",color:"#fff"}}>Agregar</button>button>
                                            </div>div>
                                </div>div>
                      </div>div>
                )}
          </div>div>
        );
}</div>
