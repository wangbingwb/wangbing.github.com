axis2 jar包详解及缺少jar包异常分析
　　开发最小jar包集:
　　activation-1.1.jar
　　axiom-api-1.2.13.jar
　　axiom-dom-1.2.13.jar
　　axiom-impl-1.2.13.jar
　　axis2-adb-1.6.2.jar
　　axis2-adb-codegen-1.6.2.jar
　　axis2-codegen-1.6.2.jar
　　axis2-java2wsdl-1.6.2.jar
　　axis2-kernel-1.6.2.jar
　　commons-codec-1.3.jar
　　commons-
　　commons-logging-1.1.1.jar
　　mail-1.4.jar
　　neethi-3.0.2.jar
　　woden-api-1.0M9.jar
　　woden-impl-commons-1.0M9.jar
　　woden-impl-dom-1.0M9.jar
　　wsdl4j-1.6.2.jar
　　wstx-asl-3.2.9.jar
　　XmlSchema-1.4.7.jar
　　axis2-transport-
　　axis2-transport-local-1.6.2.jar
　　

异常:Java.lang.NoClassDefFoundError: org/apache/neethi/PolicyComponent
缺少:neethi-2.0.4.jar

异常:
严重: StandardWrapper.Throwable
java.lang.NoClassDefFoundError: org/apache/woden/resolver/URIResolver
缺少:woden-api-1.0MB.jar 和woden-impl-dom-1.0MB.jar
　　java.lang.NoClassDefFoundError: javax/mail/internet/ParseException
　　缺少mail-1.4.jar
　　axis2 webservice 服务端jar包：
　　-->axis2-kernel-1.6.1.jar
-->axis2-spring-1.6.1.jar
-->axis2-transport-
-->XmlSchema-1.4.7.jar
-->wsdl4j-1.6.2.jar
-->axiom-api-1.2.12.jar
-->axiom-impl-1.2.12.jar
-->neethi-3.0.1.jar
-->axis2-transport-local-1.6.1.jar
-->commons-
-->axis2-jaxws-1.6.1.jar
-->spring.jar
-->commons-logging-1.1.1.jar
　
axis2 webservice client端jar包
　　-->axis2-kernel-1.6.1.jar
-->axis2-adb-1.6.1.jar
-->axiom-api-1.2.12.jar
-->commons-logging-1.1.1.jar
-->wsdl4j-1.6.2.jar
-->XmlSchema-1.4.7.jar
-->axiom-impl-1.2.12.jar
-->neethi-3.0.1.jar
-->axis2-transport-local-1.6.1.jar
-->axis2-transport-
-->commons-
-->
-->commons-codec-1.3.jar
　　各种类缺失对于的jar包：
　　org.apache.axis2.extensions.spring.receivers.ApplicationContextHolder -->axis2-spring-1.6.1.jar
org.apache.axis2.transport.http.AxisServlet 　-->axis2-transport-
javax.wsdl.xml.WSDLLocator 　-->wsdl4j-1.6.2.jar
ormons.schema.resolver.URIResolver -->XmlSchema-1.4.7.jar
org.apache.axiom.om.OMNode 　-->axiom-api-1.2.12.jar
org.apache.axiom.om.impl.llom.factory.OMLinkedListMetaFactory -->axiom-impl-1.2.12.jar
org.apache.neethi.PolicyComponent 　 -->neethi-3.0.1.jar
org.apache.axis2.transport.local.LocalTransportSender -->axis2-transport-local-1.6.1.jar
ormons.;commons-
javax.mail.internet.ParseException 　-->mail-1.4.jar
ormons.fileupload.FileItemFactory -->commons-fileupload-1.2.jar
org.apache.woden.resolver.URIResolver -->woden-api-1.0M9.jar
org.apache.axis2.jaxws.dispatchers.GenericProviderDispatcher 　-->axis2-jaxws-1.6.1.jar
ormons.io.FileUtils 　 -->commons-io-1.4.jar
org.apache.axis2.rpc.receivers.RPCInOnlyMessageReceiver -->axis2-adb-1.6.1.jar
org.apache.axis2.rpc.client.RPCServiceClient -->axis2-adb-1.6.1.jar
org.apache.axis2.AxisFault　 -->axis2-kernel-1.6.1.jar
org.apache.axis2.addressing.EndpointReference -->axis2-kernel-1.6.1.jar
org.apache.axis2.client.Options -->axis2-kernel-1.6.1.jar
ormons.logging.LogFactory -->commons-logging-1.1.1.jar
org.apache.axis2.transport.http.CommonsHTTPTransportSender -->axis2-transport-
org.apache.http.HttpResponseFactory -->
ordec.DecoderException -->commons-codec-1.3.jar