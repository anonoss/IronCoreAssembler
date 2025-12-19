Name:       MIPSduino
Version:    2.0.0
Release:    1
Summary:    MIPSduino Assembler (MicroCoreASM)
License:    MIT
BuildArch:  x86_64

%description
A modern toolchain for MIPS assembly, wrapping MARS with MicroCoreASM hardware integration.

%install
mkdir -p %{buildroot}/usr/local/bin
install -m 755 %{_sourcedir}/MIPSduino %{buildroot}/usr/local/bin/MIPSduino

%files
/usr/local/bin/MIPSduino
